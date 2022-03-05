import React from "react";
import { InfoWindowData } from "types";
import { getTime } from "./helper";

interface InfoProps {
  info: InfoWindowData;
}

export const Information: React.FC<InfoProps> = (props) => {
  return (
    <div>
      <p>
        {props.info.street !== "" ? props.info.street + "," : ""}{" "}
        {props.info.city}
      </p>
      <p>{props.info.description}</p>
      {props.info.speedKh && <p>Average speed: {props.info.speedKh} km/h</p>}
      {props.info.time && (
        <p>Driving time: {Math.round(props.info.time / 60)} mins</p>
      )}
      {props.info.type && <p>{props.info.type}</p>}
      <br />
      <p>{getTime(props.info.date)}</p>
    </div>
  );
};
