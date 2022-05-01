import React, { useCallback, useState, useEffect, memo } from "react";
import { containerStyle, initOptions, mapOptions } from "./helper";
import { Container, UserLocation } from "./Elements";
import { AiOutlineAim } from "react-icons/ai";
import { Information } from "./Information";
import { useLocation, useApiUrl } from "../../hooks";
import { Post } from "services";
import {
  PolyPath,
  WazeAlertInfo,
  InfoWindowData,
  WazeTrafficInfo,
} from "types";
import {
  Marker,
  Polyline,
  GoogleMap,
  InfoWindow,
  TrafficLayer,
  useGoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";

type MAP = ReturnType<typeof useGoogleMap>;

interface Props {
  polys?: PolyPath[];
  showWazeAlertsLayer?: boolean;
  showWazeTrafficLayer?: boolean;
  showGoogleTrafficLayer?: boolean;
}

export const Map: React.FC<Props> = memo(
  ({
    polys,
    showWazeAlertsLayer,
    showWazeTrafficLayer,
    showGoogleTrafficLayer,
  }) => {
    const apiUrl = useApiUrl();
    const { location } = useLocation();
    const { isLoaded } = useJsApiLoader(initOptions);
    const [map, setMap] = useState<MAP>(null);
    const [wazeTrafficInfo, setWazeTrafficInfo] = useState<WazeTrafficInfo[]>(
      [],
    );
    const [wazeAlertInfo, setWazeAlertInfo] = useState<WazeAlertInfo[]>([]);
    const [info, setInfo] = useState<InfoWindowData | null>(null);
    const [center] = useState({
      lat: 11.007100105286,
      lng: -74.809196472168,
    });

    const [count, setCount] = useState<{
      coord: { lat: number; lng: number }[];
      c: number;
    }>({ coord: [], c: 0 });

    const onClick = useCallback(
      ({ lat, lng }: { lat: number; lng: number }) => {
        setCount((ci) => ({ c: ci.c + 1, coord: [...ci.coord, { lat, lng }] }));
      },
      [],
    );

    const panToUserLocation = useCallback(() => {
      if (location) {
        map?.panTo(location);
        map?.setZoom(14);
      }
    }, [location, map]);

    const onLoad = useCallback((map: MAP) => {
      setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
      setMap(null);
    }, []);

    useEffect(() => {
      if (map) {
        Post<{ result: WazeTrafficInfo[] }>(apiUrl, "/report/traffic", {
          lat: map.getCenter()?.lat(),
          lng: map.getCenter()?.lng(),
        }).then((res) => {
          setWazeTrafficInfo(res.data.result);
        });

        Post<{ result: WazeAlertInfo[] }>(apiUrl, "/report/alerts", {
          lat: map.getCenter()?.lat(),
          lng: map.getCenter()?.lng(),
        }).then((res) => {
          setWazeAlertInfo(res.data.result);
        });
      }
    }, [map, apiUrl]);

    useEffect(() => {
      if (count.c === 2) {
        Post<any>(apiUrl, "/path", {
          points: count.coord,
        }).then((res) => {
          setWazeTrafficInfo([
            {
              city: "" + res.data.time,
              date: 0,
              description: "" + res.data.distance,
              level: 0,
              path: res.data.coords,
              speedKh: 0,
              street: "",
              time: 0,
            },
          ]);
        });
        setCount({ coord: [], c: 0 });
      }
    }, [count, apiUrl]);

    return isLoaded ? (
      <Container>
        <UserLocation onClick={panToUserLocation}>
          <AiOutlineAim color="black" size={25} />
        </UserLocation>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
          onClick={(e) => {
            onClick({ lat: e.latLng?.lat() || 0, lng: e.latLng?.lng() || 0 });
          }}
        >
          {showGoogleTrafficLayer && <TrafficLayer />}
          {polys &&
            polys?.length > 0 &&
            polys.map((poly, i) => (
              <Polyline
                key={i}
                path={poly.path}
                options={{
                  strokeColor: poly.color,
                }}
              />
            ))}
          {showWazeTrafficLayer &&
            wazeTrafficInfo.length > 0 &&
            wazeTrafficInfo.map((poly, i) => (
              <Polyline
                key={i}
                path={poly.path}
                options={{
                  strokeColor: "black",
                  clickable: true,
                }}
                onClick={(e) => {
                  setInfo({
                    ...poly,
                    location: {
                      lat: e.latLng?.lat() || 0,
                      lng: e.latLng?.lng() || 0,
                    },
                  });
                }}
              />
            ))}
          {showWazeAlertsLayer &&
            wazeAlertInfo.length > 0 &&
            wazeAlertInfo.map((alert, i) => (
              <Marker
                position={alert.location}
                key={i}
                onClick={() => {
                  setInfo({
                    ...alert,
                  });
                }}
              />
            ))}
          {info && (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <InfoWindow
              position={info.location}
              onCloseClick={() => {
                setInfo(null);
              }}
            >
              <Information info={info} />
            </InfoWindow>
          )}
        </GoogleMap>
      </Container>
    ) : (
      <></>
    );
  },
);
