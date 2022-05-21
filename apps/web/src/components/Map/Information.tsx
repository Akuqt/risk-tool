import React from "react";
import { InfoWindowData } from "types";
import { formatNumber } from "../../utils";
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
        <>
          <p>Driving time: {Math.round(props.info.time / 60)} mins</p>
          <br />
        </>
      )}
      <p>{props.info.date ? getTime(props.info.date) : ""}</p>
      {props.info.driver && <p>Driver: {props.info.driver}</p>}
      {props.info.route && <p>Route: {props.info.route}</p>}
      {props.info.material && <p>Material: {props.info.material}</p>}
      {props.info.distance && (
        <p>
          Distance: {formatNumber((props.info.distance || 0) / 1000, 2, "km")}
        </p>
      )}
      {props.info.duration && (
        <p>Time: {formatNumber((props.info.duration || 0) / 60, 2, "min")}</p>
      )}
      {props.info.cName && (
        <p style={{ fontWeight: "bold" }}>{props.info.cName}</p>
      )}
      {props.info.dAddress && <p>Address: {props.info.dAddress}</p>}
      {props.info.risk && <p>Risk: {formatNumber(props.info.risk, 2, "%")}</p>}
    </div>
  );
};
