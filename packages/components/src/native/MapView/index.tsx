import React, { useCallback, useState } from "react";
import SVGImg from "../RemoteSvg";
import mapStyle from "./style";
import Map, { Marker, Polyline } from "react-native-maps";
import { Data, WazeAlertInfo, WazeTrafficInfo } from "types";
import { View } from "react-native";
import { Post } from "services";

interface Props {
  location?: Data;
  polys?: { latitude: number; longitude: number }[][];
  markers?: {
    coords: { latitude: number; longitude: number };
    info?: {
      address?: string;
      name?: string;
    };
    icon?: any;
  }[];
  googleTrafficLayer?: boolean;
  wazeTrafficLayer?: boolean;
  wazeAlertLayer?: boolean;
}

export const getAlertIcon = (alert: WazeAlertInfo) => {
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

export const getTimeColor = (t: number) => {
  return t > 0 && t < 5 ? "green" : t > 5 && t < 10 ? "orange" : "red";
};

export const MapView: React.FC<Props> = (props) => {
  const [wazeTrafficInfo, setWazeTrafficInfo] = useState<WazeTrafficInfo[]>([]);
  const [wazeAlertInfo, setWazeAlertInfo] = useState<WazeAlertInfo[]>([]);

  const updateWazeInfo = useCallback(() => {
    Post<{ result: WazeTrafficInfo[] }>(
      "http://10.0.2.2:4000/api/v1",
      "/report/traffic",
      {
        lat: 10.9800101,
        lng: -74.809196472168,
      },
    ).then(({ data: { result } }) => setWazeTrafficInfo(result));

    Post<{ result: WazeAlertInfo[] }>(
      "http://10.0.2.2:4000/api/v1",
      "/report/alerts",
      {
        lat: 10.9800101,
        lng: -74.809196472168,
      },
    ).then(({ data: { result } }) => setWazeAlertInfo(result));
  }, []);
  return (
    <View>
      <Map
        onMapLoaded={() => {
          updateWazeInfo();
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        showsUserLocation
        showsTraffic={props.googleTrafficLayer}
        customMapStyle={mapStyle}
        region={{
          latitude: 10.9800101,
          longitude: -74.809196472168,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {props.markers &&
          props.markers.length > 0 &&
          props.markers.map((marker, i) => (
            <Marker
              key={i}
              coordinate={marker.coords}
              title={marker.info?.name || marker.info?.address || ""}
              description={marker.info?.name ? marker.info?.address || "" : ""}
            >
              <SVGImg
                source={marker.icon}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </Marker>
          ))}
        {props.polys &&
          props.polys.length > 0 &&
          props.polys.map((poly, i) => (
            <Polyline
              key={i}
              coordinates={poly}
              strokeColor="tomato"
              strokeWidth={4}
            />
          ))}
        {props.wazeAlertLayer &&
          wazeAlertInfo.length > 0 &&
          wazeAlertInfo.map((alert, i) => (
            <Marker
              key={i}
              coordinate={{
                latitude: alert.location.lat,
                longitude: alert.location.lng,
              }}
              title={alert.street}
              description={alert.description}
            >
              <SVGImg
                source={{ uri: getAlertIcon(alert) }}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </Marker>
          ))}
        {props.wazeTrafficLayer &&
          wazeTrafficInfo.length > 0 &&
          wazeTrafficInfo.map((traffic, i) => {
            const path = traffic.path.map((p) => ({
              latitude: p.lat,
              longitude: p.lng,
            }));
            return (
              <Polyline
                coordinates={path}
                key={i}
                strokeColor={getTimeColor(traffic.time / 60)}
                strokeWidth={3}
              />
            );
          })}
      </Map>
    </View>
  );
};
