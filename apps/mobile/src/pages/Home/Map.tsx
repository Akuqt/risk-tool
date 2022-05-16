import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { MapView } from "components/src/native";

export const Map: React.FC = () => {
  const route = useSelector((state: RootState) => state.userReducer.user.route);
  return (
    <MapView
      polys={[
        route.map((coord) => ({ latitude: coord.lat, longitude: coord.lng })),
      ]}
    />
  );
};
