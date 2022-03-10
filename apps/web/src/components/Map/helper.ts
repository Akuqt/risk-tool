import styles from "./styles";
import { Duration, DurationLikeObject } from "luxon";
import { LoadScriptProps, useJsApiLoader } from "@react-google-maps/api";

type LoaderOpts = Parameters<typeof useJsApiLoader>[0];

export const getTime = (
  date: number,
  shift: keyof DurationLikeObject = "minutes",
): string => {
  const res = Math.round(
    parseFloat(
      Duration.fromMillis(Date.now())
        .minus(date)
        .shiftTo(shift)
        .toHuman({ unitDisplay: "short" })
        .replace(",", "."),
    ),
  );
  if (shift === "minutes" && res > 60) return getTime(date, "hours");
  if (shift === "hours" && res > 24) return getTime(date, "days");
  if (shift === "days" && res > 30) return getTime(date, "months");
  if (shift === "minute" && res > 12) return getTime(date, "years");
  return `${res} ${res < 2 ? shift.slice(0, -1) : shift} ago`;
};

export const mapOptions = {
  styles,
  disableDoubleClickZoom: true,
  streetViewControl: true,
  fullscreenControl: false,
  mapTypeControlOptions: {
    mapTypeIds: ["hybrid", "roadmap", "satellite"],
  },
  mapTypeControl: false,
};

export const containerStyle = {
  width: "100%",
  height: "100%",
};

const libraries: LoadScriptProps["libraries"] = ["drawing"];

export const initOptions: LoaderOpts = {
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_KEY,
  libraries,
  version: "3.48",
  language: "en",
};
