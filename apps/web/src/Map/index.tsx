import React, { useCallback, useState, useEffect, memo } from "react";
import { Container, UserLocation } from "./Elements";
import { AiOutlineAim } from "react-icons/ai";
import { Information } from "./Information";
import { useLocation } from "../hooks";
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
  // DistanceMatrixService,
} from "@react-google-maps/api";
import { containerStyle, initOptions, mapOptions } from "./helper";

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

    const panToUserLocation = useCallback(() => {
      if (location) {
        map?.panTo(location);
      }
    }, [location, map]);

    const onLoad = useCallback((map: MAP) => {
      setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
      setMap(null);
    }, []);

    useEffect(() => {
      (async () => {
        if (map) {
          Post<{ result: WazeTrafficInfo[] }>("/report/traffic", {
            lat: map.getCenter()?.lat(),
            lng: map.getCenter()?.lng(),
          }).then((res) => {
            setWazeTrafficInfo(res.data.result);
          });

          Post<{ result: WazeAlertInfo[] }>("/report/alerts", {
            lat: map.getCenter()?.lat(),
            lng: map.getCenter()?.lng(),
          }).then((res) => {
            setWazeAlertInfo(res.data.result);
          });
        }
      })();
    }, [map]);

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
        >
          {showGoogleTrafficLayer && <TrafficLayer />}
          {/* <DistanceMatrixService
          callback={(a, b) => {
            console.log(a);
            console.log(b);
          }}
          options={{
            travelMode: window.google.maps.TravelMode.DRIVING,
            destinations: [
              { lat: 11.096641586377432, lng: -74.81902955652312 },
            ],
            origins: [{ lat: 11.006496778495276, lng: -74.81869830370978 }],
          }}
        /> */}
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
