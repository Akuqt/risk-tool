import barranquilla from "./barranquilla.json";
import { Coord } from "types";

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const getDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

const getPathDistanceAndTime = (path: Coord[]) => {
  let distance = 0;
  for (let i = 0; i < path.length - 1; i++) {
    distance += getDistanceKm(
      path[i].lat,
      path[i].lng,
      path[i + 1].lat,
      path[i + 1].lng,
    );
  }
  return {
    distance: distance * 1000,
    time: (distance * 1000) / 8.33333,
  };
};

const getClosestIndex = (lat: number, lng: number, coords: Coord[]) => {
  let closest = 0;
  let closestDistance = getDistanceKm(lat, lng, coords[0].lat, coords[0].lng);
  for (let i = 1; i < coords.length; i++) {
    const distance = getDistanceKm(lat, lng, coords[i].lat, coords[i].lng);
    if (distance < closestDistance) {
      closest = i;
      closestDistance = distance;
    }
  }
  return closest;
};

export const getBestRoutePath = (origin: Coord, destination: Coord) => {
  const originIndex = getClosestIndex(origin.lat, origin.lng, barranquilla);
  const destinationIndex = getClosestIndex(
    destination.lat,
    destination.lng,
    barranquilla,
  );
  let path: Coord[] = [];
  let path2: Coord[] = [];

  if (originIndex <= destinationIndex) {
    path = barranquilla.slice(originIndex, destinationIndex + 1);
    path2 = barranquilla.slice(0, originIndex);
    path2 = [
      ...barranquilla.slice(destinationIndex + 1, barranquilla.length),
      ...path2,
    ];

    if (
      getPathDistanceAndTime(path2).distance <
      getPathDistanceAndTime(path).distance
    ) {
      path = path2;
    }
  } else {
    path = barranquilla.slice(destinationIndex, originIndex + 1);
    path2 = barranquilla.slice(0, destinationIndex);
    path2 = [
      ...barranquilla.slice(originIndex + 1, barranquilla.length),
      ...path2,
    ];

    if (
      getPathDistanceAndTime(path2).distance <
      getPathDistanceAndTime(path).distance
    ) {
      path = path2;
    }
  }
  return {
    fixedPath: { coords: path, ...getPathDistanceAndTime(path) },
    nextOrigin: barranquilla[originIndex],
    nextDestination: barranquilla[destinationIndex],
  };
};
