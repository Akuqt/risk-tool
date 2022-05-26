import barranquilla from "./barranquilla.json";
import { Coord } from "types";

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

export const getDistanceKm = (origin: Coord, destination: Coord) => {
  const R = 6371;
  const dLat = deg2rad(destination.lat - origin.lat);
  const dLon = deg2rad(destination.lng - origin.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(origin.lat)) *
      Math.cos(deg2rad(destination.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

const getPathDistanceAndTime = (path: Coord[]) => {
  let distance = 0;
  for (let i = 0; i < path.length - 1; i++) {
    distance += getDistanceKm(path[i], path[i + 1]);
  }
  return {
    distance: distance * 1000,
    time: (distance * 1000) / 8.33333,
  };
};

const getClosestIndex = (origin: Coord, coords: Coord[]) => {
  let closest = 0;
  let closestDistance = getDistanceKm(origin, coords[0]);
  for (let i = 1; i < coords.length; i++) {
    const distance = getDistanceKm(origin, coords[i]);
    if (distance < closestDistance) {
      closest = i;
      closestDistance = distance;
    }
  }
  return closest;
};

export const getBestRoutePath = (origin: Coord, destination: Coord) => {
  const originIndex = getClosestIndex(origin, barranquilla);
  const destinationIndex = getClosestIndex(destination, barranquilla);
  let path: Coord[] = [];
  let path2: Coord[] = [];
  /* istanbul ignore next */
  if (originIndex <= destinationIndex) {
    path = barranquilla.slice(originIndex, destinationIndex + 1);
    path2 = barranquilla.slice(0, originIndex);
    path2 = [
      ...barranquilla.slice(destinationIndex + 1, barranquilla.length),
      ...path2,
    ];
  } else {
    path = barranquilla.slice(destinationIndex, originIndex + 1);
    path2 = barranquilla.slice(0, destinationIndex);
    path2 = [
      ...barranquilla.slice(originIndex + 1, barranquilla.length),
      ...path2,
    ];
  }
  return {
    fixedPath: [
      { coords: path, ...getPathDistanceAndTime(path) },
      { coords: path2.reverse(), ...getPathDistanceAndTime(path2) },
    ],
    nextOrigin: barranquilla[originIndex],
    nextDestination: barranquilla[destinationIndex],
  };
};
