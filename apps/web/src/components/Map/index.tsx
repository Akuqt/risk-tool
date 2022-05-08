import React, { useCallback, useState, useEffect, memo } from "react";
import { containerStyle, initOptions, mapOptions } from "./helper";
import { Container, UserLocation } from "./Elements";
import { useLocation, useApiUrl } from "../../hooks";
import { AiOutlineAim } from "react-icons/ai";
import { Information } from "./Information";
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

const getAlertIcon = (alert: WazeAlertInfo) => {
  switch (alert.type) {
    case "ACCIDENT":
      return "https://www.waze.com/livemap/assets/accident-major-e4499a78307739ab9e04b2c57eb65feb.svg";
    case "POLICE":
      return "https://www.waze.com/livemap/assets/police-987e7deeb8893a0e088fbf5aac5082f7.svg";
    case "ROAD_CLOSED":
      return "https://www.waze.com/livemap/assets/closure-d85b532570fa89f0cc951f5f3ef1e387.svg";
    default:
      return "https://www.waze.com/livemap/assets/hazard-02e4ae89da4f6b5a88a7bc5e4725f2e5.svg";
  }
};

const getTimeColor = (t: number) => {
  return t > 0 && t < 5 ? "green" : t > 5 && t < 10 ? "orange" : "red";
};

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

    const [init, setInit] = useState(true);

    const onClick = useCallback(
      ({ lat, lng }: { lat: number; lng: number }) => {
        setCount((ci) => ({ c: ci.c + 1, coord: [...ci.coord, { lat, lng }] }));
      },
      [],
    );

    const updateWazeInfo = useCallback(() => {
      if (map) {
        Post<{ result: WazeTrafficInfo[] }>(apiUrl, "/report/traffic", {
          lat: map.getCenter()?.lat(),
          lng: map.getCenter()?.lng(),
        }).then(({ data: { result } }) => setWazeTrafficInfo(result));

        Post<{ result: WazeAlertInfo[] }>(apiUrl, "/report/alerts", {
          lat: map.getCenter()?.lat(),
          lng: map.getCenter()?.lng(),
        }).then(({ data: { result } }) => setWazeAlertInfo(result));
      }
    }, [apiUrl, map]);

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
      const condition = map && (showWazeAlertsLayer || showWazeTrafficLayer);
      if (init && map) {
        updateWazeInfo();
        setInit(false);
      } else if (condition) {
        const interval = setInterval(() => {
          updateWazeInfo();
        }, 6 * 1000 * 60);
        return () => clearInterval(interval);
      }
    }, [
      map,
      init,
      apiUrl,
      updateWazeInfo,
      showWazeAlertsLayer,
      showWazeTrafficLayer,
    ]);

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
                  strokeColor: getTimeColor(poly.time / 60),
                  clickable: true,
                  strokeWeight: 3,
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
            wazeAlertInfo.map((alert, i) => {
              if (alert.type !== "JAM") {
                const Sizer = window.google.maps.Size;
                return (
                  <Marker
                    position={alert.location}
                    icon={{
                      url: getAlertIcon(alert),
                      scaledSize: new Sizer(35, 40),
                    }}
                    key={i}
                    onClick={() => {
                      setInfo({
                        ...alert,
                      });
                    }}
                  />
                );
              }
            })}
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
