import {
  BestRoute,
  Coord,
  FCompany,
  FLog2,
  PolyPath,
  WazeAlertInfo,
} from "types";

export const debounce = (cb: (...args: any) => void, delay = 1000) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), delay);
  };
};

export const formatAddress = (address: string) => {
  return address
    .split(",")
    .filter((u) => !/.*ntico$|.*lombia$/gi.test(u.trim()))
    .join(", ");
};

export const formatNumber = (number: number, digits: number, unit: string) => {
  const res = parseFloat(number.toString());
  return (res !== 0 ? res.toFixed(digits) : "--") + " " + unit;
};

export const getAlertIcon = (alert: WazeAlertInfo) => {
  switch (alert.type) {
    case "ACCIDENT":
      return "https://www.waze.com/livemap/assets/accident-major-e4499a78307739ab9e04b2c57eb65feb.svg";
    case "POLICE":
      return "https://www.waze.com/livemap/assets/police-987e7deeb8893a0e088fbf5aac5082f7.svg";
    case "ROAD_CLOSED":
      return "https://www.waze.com/livemap/assets/closure-d85b532570fa89f0cc951f5f3ef1e387.svg";
    default:
      return "https://www.waze.com/livemap/assets/hazard-02e4ae89da4f6b5a88a7bc5e4725f2e5.svg";
  }
};

export const getTimeColor = (t: number) => {
  return t > 0 && t < 5 ? "green" : t > 5 && t < 10 ? "orange" : "red";
};

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

export const getClosestIndex = (origin: Coord, destinations: Coord[]) => {
  let closest = 0;
  let minDistance = 9999999;
  for (let i = 0; i < destinations.length; i++) {
    const distance = getDistanceKm(origin, destinations[i]);
    if (distance < minDistance) {
      minDistance = distance;
      closest = i;
    }
  }
  return closest;
};

export const randomColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padEnd(6, "0");

export const riskPathMap = (p: {
  path: Coord[];
  color: string;
  risk: number;
}): PolyPath => {
  return {
    path: p.path,
    color: p.color,
    clickable: true,
    info: {
      risk: p.risk,
    },
  };
};

export const getDriver = (id: string, drivers: FCompany["drivers"]) => {
  return drivers.find((d) => d.id === id);
};

export const getRoutes = (id: string, routes: BestRoute[]) => {
  const route = routes.find((r) => r.id === id);
  return route ? [route] : routes;
};

export const getDrivers = (id: string, drivers: FCompany["drivers"]) => {
  const driver = drivers.find((d) => d.id === id);
  return driver ? [driver] : drivers;
};

export const getDestinations = (
  latlng: string,
  destinations: {
    coords: Coord;
    svgColor: string;
    svgPath: string;
  }[],
  color: string,
) => {
  try {
    const { lat, lng } = JSON.parse(latlng);
    const destination = destinations.find(
      ({ coords }) => coords.lat === lat && coords.lng === lng,
    );
    return destination ? [{ ...destination, svgColor: color }] : destinations;
  } catch (error) {
    return destinations;
  }
};

export const logFilter = (log: FLog2 | null, id: string) => {
  if (log === null) return true;
  return id === log.driver;
};
