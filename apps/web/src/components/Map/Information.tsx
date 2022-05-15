import React from "react";
import { InfoWindowData } from "types";
import { getTime } from "./helper";

interface InfoProps {
  info: InfoWindowData;
}

export const Information: React.FC<InfoProps> = (props) => {
  return (
    <div>
      {props.info.type === "POLICE" && (
        <p style={{ fontWeight: "bold" }}>Police</p>
      )}
      {props.info.type === "ACCIDENT" && (
        <p style={{ fontWeight: "bold" }}>Crash</p>
      )}
      <p style={{ fontWeight: "bold" }}>{props.info.description}</p>
      <p>
        {props.info.street ? props.info.street + "," : ""} {props.info.city}
      </p>
      {props.info.speedKh && <p>Average speed: {props.info.speedKh} km/h</p>}
      {props.info.time && (
        <p>Driving time: {Math.round(props.info.time / 60)} mins</p>
      )}
      <br />
      <p>{getTime(props.info.date)}</p>
    </div>
  );
};
