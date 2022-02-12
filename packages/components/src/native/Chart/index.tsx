import React from "react";
import { PieChart } from "react-native-svg-charts";
import { genData } from "./util";

interface Props {
  v1: number;
  v2: number;
  v3: number;
}

export const Chart: React.FC<Props> = ({ v1, v2, v3 }) => {
  return (
    <PieChart
      style={{
        height: "100%",
        width: "100%",
      }}
      data={genData(v1, v2, v3)}
    />
  );
};
