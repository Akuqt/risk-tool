import mongoose, { Document } from "mongoose";

export type Justify =
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-around"
  | "space-between"
  | "space-evenly";

export type Align = "center" | "flex-start" | "flex-end";

export interface DriverLocation {
  id: string;
  lat: number;
  lng: number;
  speed: number;
  tmp: number;
}

export interface Data {
  lat: number;
  lng: number;
  speed: number;
  tmp: number;
}

export interface DataID {
  watchId: number | null;
}

export interface WazeCoord {
  y: number;
  x: number;
}
export interface Coord {
  lat: number;
  lng: number;
}

export interface PolyPath {
  path: Coord[];
  color: string;
  clickable?: boolean;
  info?: {
    time?: number;
    distance?: number;
    material?: string;
    risk?: number;
    route?: string;
    driver?: string;
  };
  onClick?: (i: number) => void;
}

export interface WazeTrafficInfo {
  city: string;
  date: number;
  description: string;
  level: number;
  speedKh: number;
  time: number;
  street: string;
  path: Coord[];
}

export interface WazeAlertInfo {
  city: string;
  date: number;
  description: string;
  location: Coord;
  street: string;
  type: string;
}

export interface InfoWindowData {
  location: Coord;
  description?: string;
  date?: number;
  street?: string;
  city?: string;
  level?: number;
  speedKh?: number;
  type?: string;
  time?: number;

  duration?: number;
  distance?: number;
  risk?: number;
  material?: string;
  route?: string;
  driver?: string;

  cName?: string;
  dAddress?: string;

  recalculate?: {
    action: () => void;
    label: string;
  };
}

export interface WazePathResponse {
  alternatives: {
    coords: WazeCoord[];
    response: {
      totalLength: number;
      totalSeconds: number;
    };
  }[];
}

export interface IRole extends Document {
  _id?: mongoose.ObjectId;
  name: string;
}

export interface FLog {
  alert: {
    reason: string;
    description: string;
  };
  action: string;
  driver: string;
  lat: number;
  lng: number;
  createdAt: string;
  updatedAt: string;
  material: string;
  destination: {
    lat: number;
    lng: number;
    address: string;
  };
}

export interface ILog extends Document, FLog {
  _id?: mongoose.ObjectId;
}

export interface FLog2 extends FLog {
  id: string;
}

export interface IRoute extends Document {
  _id?: mongoose.ObjectId;
  coords: Coord[];
  distance: number;
  time: number;
  risk: number;
  material: string;
  driver: string;
  createdAt: string;
  updatedAt: string;
  address: string;
  active: boolean;
}

export interface ICompany extends Document {
  _id?: mongoose.ObjectId;
  name: string;
  materials: string[];
  address: string;
  lat: number;
  lng: number;
  logs: ILog[];
  routes: IRoute[];
  username: string;
  password: string;
  role: IRole;
  tokenVersion: number;
}

export interface IDriver extends Document {
  _id?: mongoose.ObjectId;
  name: string;
  lastname: string;
  gender: string;
  username: string;
  password: string;
  plate: string;
  company: ICompany;
  lat: number;
  lng: number;
  material: string;
  role: IRole;
  tokenVersion: number;
  active: boolean;
  route: Coord[];
  address: string;
  dlat: number | null;
  dlng: number | null;
}

export interface FDriver {
  id: string;
  name: string;
  lastname: string;
  gender: string;
  username: string;
  plate: string;
  company: {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
  };
  lat: number;
  lng: number;
  material: string;
  address: string;
  dlat: number;
  dlng: number;
  role: string;
  token: string;
  active: boolean;
  route: Coord[];
}

export interface FDriver2 {
  name: string;
  lastname: string;
  gender: string;
  id: string;
  plate: string;
  active: boolean;
  user: string;
  lat: number;
  lng: number;
}

export interface FCompany {
  id: string;
  name: string;
  username: string;
  address: string;
  lat: number;
  lng: number;
  materials: string[];
  role: string;
  drivers: FDriver2[];
  token: string;
  logs: FLog2[];
  lastRoutes: {
    risk: number;
    date: string;
  }[];
}

export interface RegisterState {
  name: string;
  password: string;
  username: string;
  address: string;
  error: boolean;
  coords: Coord;
}

export interface RegisterAction {
  type:
    | "setName"
    | "setPassword"
    | "setUsername"
    | "setAddress"
    | "clearAll"
    | "setError"
    | "setCoords";
  payload?: any;
}

interface Option {
  value: string;
  label: string;
}

export interface PlannerState {
  address: string;
  material?: Option;
  driver?: Option;
  clickable: boolean;
  loadingAddress: boolean;
  destination: Coord | null;
  settings: boolean;
  pathSelector: boolean;
  googleTL: boolean;
  wazeTL: boolean;
  wazeTA: boolean;
  fixedPath: BaseBestPath[];
  fixedPathIndex: number;
  mapLoading: boolean;
  riskCalculation: boolean;
  risk: number;
  riskPaths: { path: Coord[]; color: string; risk: number }[];
  currentIndex: number;
  newIndex: number;
  showModal: boolean;
  logMarker: { coords: Coord; svgPath: string; svgColor: string } | null;
}

export interface PlannerAction {
  type:
    | "setAddress"
    | "setMaterial"
    | "setDriver"
    | "setClickable"
    | "setLoadingAddress"
    | "setDestination"
    | "setSettings"
    | "setPathSelector"
    | "setGoogleTL"
    | "setWazeTL"
    | "setWazeTA"
    | "setFixedPath"
    | "setFixedPathIndex"
    | "setMapLoading"
    | "setRiskCalculation"
    | "setRisk"
    | "setRiskPaths"
    | "setCurrentIndex"
    | "setNewIndex"
    | "setShowModal"
    | "setLogMarker"
    | "reset"
    | "resetRisk";
  payload?: any;
}

export interface GeneralState {
  settings: boolean;
  googleTL: boolean;
  wazeTL: boolean;
  wazeTA: boolean;
  mapLoading: boolean;
  routes: BestRoute[];
  currentRoute?: Option;
  destinations: {
    coords: Coord;
    svgColor: string;
    svgPath: string;
  }[];
  logMarker?: {
    coords: Coord;
    icon: any;
    address: string;
    reason: string;
    description: string;
  };
}

export interface GeneralAction {
  type:
    | "setSettings"
    | "setGoogleTL"
    | "setWazeTL"
    | "setWazeTA"
    | "setMapLoading"
    | "setRoutes"
    | "setDestinations"
    | "setCurrentRoute"
    | "setLogMarker";
  payload?: any;
}

export interface LoginState {
  password: string;
  username: string;
}

export interface LoginAction {
  type: "setPassword" | "setUsername" | "clearAll";
  payload?: any;
}

export interface IError {
  code: number;
  message: string;
}

export interface JWTPayload {
  username: string;
  _id: string;
  role: string;
  tokenVersion: number;
  iat: number;
  exp: number;
}

export interface BaseBestPath {
  coords: Coord[];
  distance: number;
  time: number;
}

export interface BestRoute extends BaseBestPath {
  risk: number;
  material: string;
  driver: string;
  createdAt: string;
  updatedAt: string;
  color: string;
  id: string;
  address: string;
  active: boolean;
}

export interface BestPath {
  result: BaseBestPath[];
}
