import React, { useState } from "react";
import Map, { Marker } from "react-native-maps";
import mapStyle from "./style";
import { View } from "react-native";
import { Data } from "types";

interface Props {
  location: Data;
}

export const MapView: React.FC<Props> = (props) => {
  const [deltas, setDeltas] = useState({
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View>
      <Map
        style={{
          width: "100%",
          height: "100%",
        }}
        customMapStyle={mapStyle}
        region={{
          latitude: props.location.lat,
          longitude: props.location.lng,
          latitudeDelta: deltas.latitudeDelta,
          longitudeDelta: deltas.longitudeDelta,
        }}
        onRegionChangeComplete={(r) => {
          setDeltas({
            latitudeDelta: r.latitudeDelta,
            longitudeDelta: r.longitudeDelta,
          });
        }}
      >
        <Marker
          coordinate={{
            latitude: props.location.lat,
            longitude: props.location.lng,
          }}
          title="Test"
          description="Testing"
        />
      </Map>
    </View>
  );
};
