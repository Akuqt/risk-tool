import React from "react";
import { Circle, Svg, Polygon } from "react-native-svg";
import { Chart } from "../Chart";
import {
  Container,
  ChartContainer,
  LabelsContainer,
  LabelSpan,
  Label,
} from "./Elements";

interface Props {
  lat: number;
  lng: number;
  tmp: number;
  speed: number;
}

export const DataCard: React.FC<Props> = (props) => {
  return (
    <Container>
      <ChartContainer>
        <Chart
          v1={props.lat}
          v2={props.lng}
          v3={props.speed === 0 ? 2 : props.speed}
        />
      </ChartContainer>
      <LabelsContainer>
        <LabelSpan>
          <Svg height="15px" width="15px" viewBox="0 0 100 100">
            <Circle cy="50" cx="50" r="45" fill="#FF6347" />
          </Svg>
          <Label>Latitude: {props.lat}</Label>
        </LabelSpan>

        <LabelSpan>
          <Svg height="15px" width="15px" viewBox="0 0 100 100">
            <Circle cy="50" cx="50" r="45" fill="#BB3820" />
          </Svg>
          <Label>Longitude: {props.lng}</Label>
        </LabelSpan>

        <LabelSpan>
          <Svg height="15px" width="15px" viewBox="0 0 100 100">
            <Circle cy="50" cx="50" r="45" fill="#808080" />
          </Svg>
          <Label>Speed: {props.speed} m/s</Label>
        </LabelSpan>

        <LabelSpan>
          <Svg height="15px" width="15px" viewBox="0 0 100 100">
            <Polygon points="50,0 0,100 100,100" fill="#ff6347ac" />
          </Svg>
          <Label>Date: {new Date(props.tmp).toLocaleString()}</Label>
        </LabelSpan>
      </LabelsContainer>
    </Container>
  );
};
