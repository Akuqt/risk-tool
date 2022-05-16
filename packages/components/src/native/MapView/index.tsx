import React from "react";
import Map, { Marker, Polyline } from "react-native-maps";
import mapStyle from "./style";
import { View } from "react-native";
import { Data } from "types";

interface Props {
  location?: Data;
  polys?: { latitude: number; longitude: number }[][];
  markers?: {
    coords: { latitude: number; longitude: number };
    info: {
      address: string;
      name: string;
    };
  }[];
}

export const MapView: React.FC<Props> = (props) => {
  return (
    <View>
      <Map
        style={{
          width: "100%",
          height: "100%",
        }}
        showsUserLocation
        customMapStyle={mapStyle}
      >
        {props.markers &&
          props.markers.length > 0 &&
          props.markers.map((marker, i) => (
            <Marker
              key={i}
              coordinate={marker.coords}
              title={marker.info.name || ""}
              description={marker.info.address || ""}
            />
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
      </Map>
    </View>
  );
};
