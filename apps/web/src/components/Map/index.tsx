import React, { useCallback, useState, useEffect, memo, useRef } from "react";
import { getAlertIcon, getClosestIndex, getTimeColor } from "../../utils";
import { containerStyle, initOptions, mapOptions } from "./helper";
import { Container, UserLocation } from "./Elements";
import { AiOutlineAim } from "react-icons/ai";
import { Information } from "./Information";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useApiUrl } from "../../hooks";
import { Coord } from "types";
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
  markers?: {
    icon?: any;
    coords: Coord | null;
    clickable?: boolean;
    svgPath?: string;
    svgColor?: string;
    info?: {
      name?: string;
      address?: string;
      description?: string;
      recalculate?: {
        label: string;
        action: () => void;
      };
    };
  }[];
  showWazeAlertsLayer?: boolean;
  showWazeTrafficLayer?: boolean;
  showGoogleTrafficLayer?: boolean;
  canClick?: boolean;
  onClick?: (coord: Coord) => void;
}

export const Map: React.FC<Props> = memo(
  ({
    polys,
    markers,
    onClick,
    canClick,
    showWazeAlertsLayer,
    showWazeTrafficLayer,
    showGoogleTrafficLayer,
  }) => {
    const mounted = useRef(false);
    const apiUrl = useApiUrl();
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

    const [init, setInit] = useState(true);

    const company = useSelector(
      (state: RootState) => state.companyReducer.company,
    );

    const updateWazeInfo = useCallback(() => {
      if (map) {
        Post<{ result: WazeTrafficInfo[] }>(apiUrl, "/report/traffic", {
          lat: map.getCenter()?.lat(),
          lng: map.getCenter()?.lng(),
        }).then(({ data: { result } }) => {
          if (mounted.current) {
            setWazeTrafficInfo(result);
          }
        });

        Post<{ result: WazeAlertInfo[] }>(apiUrl, "/report/alerts", {
          lat: map.getCenter()?.lat(),
          lng: map.getCenter()?.lng(),
        }).then(({ data: { result } }) => {
          if (mounted.current) {
            setWazeAlertInfo(result);
          }
        });
      }
    }, [apiUrl, map]);

    const panToUserLocation = useCallback(() => {
      if (company && company.lat && company.lng) {
        map?.panTo({
          lat: company.lat,
          lng: company.lng,
        });
        map?.setZoom(14);
      }
    }, [company, map]);

    const onLoad = useCallback((map: MAP) => {
      if (mounted.current) {
        setMap(map);
      }
    }, []);

    const onUnmount = useCallback(() => {
      if (mounted.current) {
        setMap(null);
      }
    }, []);

    useEffect(() => {
      const condition = map && (showWazeAlertsLayer || showWazeTrafficLayer);
      if (init && map) {
        if (mounted.current) {
          updateWazeInfo();
          setInit(false);
        }
      } else if (condition) {
        const interval = setInterval(() => {
          if (mounted.current) {
            updateWazeInfo();
          }
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
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

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
            if (onClick && canClick) {
              onClick({ lat: e.latLng?.lat() || 0, lng: e.latLng?.lng() || 0 });
            }
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
                  strokeWeight: 6,
                }}
                onClick={(e) => {
                  if (poly.clickable) {
                    if (poly.onClick) {
                      poly.onClick(
                        getClosestIndex(
                          {
                            lat: e.latLng?.lat() || 0,
                            lng: e.latLng?.lng() || 0,
                          },
                          poly.path,
                        ),
                      );
                    } else {
                      setInfo({
                        duration: poly.info?.time,
                        distance: poly.info?.distance,
                        risk: poly.info?.risk,
                        material: poly.info?.material,
                        route: poly.info?.route,
                        driver: poly.info?.driver,
                        location: {
                          lat: e.latLng?.lat() || 0,
                          lng: e.latLng?.lng() || 0,
                        },
                      });
                    }
                  }
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
          {markers &&
            markers.length > 0 &&
            markers.map((marker, i) => {
              if (marker.coords) {
                const Point = window.google.maps.Point;
                return (
                  <Marker
                    key={i}
                    position={{
                      lat: marker.coords.lat,
                      lng: marker.coords.lng,
                    }}
                    icon={{
                      url: marker.icon,
                      path: marker.svgPath,
                      fillColor: marker.svgColor,
                      fillOpacity: 1,
                      strokeColor: "black",
                      scale: 1.5,
                      anchor: marker.svgPath ? new Point(5, 20) : undefined,
                    }}
                    onClick={(e) => {
                      if (marker.clickable) {
                        setInfo({
                          location: {
                            lat: e.latLng?.lat() || 0,
                            lng: e.latLng?.lng() || 0,
                          },
                          cName: marker.info?.name,
                          dAddress: marker.info?.address,
                          description: marker.info?.description,
                          recalculate: marker.info?.recalculate,
                        });
                      }
                    }}
                  />
                );
              }
            })}

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
