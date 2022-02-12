import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { MapView } from "components/src/native";

export const Map: React.FC = () => {
  const location = useSelector(
    (state: RootState) => state.locationReducer.data,
  );
  return <MapView location={location} />;
};
