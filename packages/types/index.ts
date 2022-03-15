import mongoose, { Document } from "mongoose";

export interface Data {
  lat: number;
  lng: number;
  speed: number;
  tmp: number;
}

export interface User {
  id: string;
  name: string;
  token: string;
  role: string;
  gender: string;
  lastname: string;
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
  description: string;
  date: number;
  street: string;
  city: string;
  level?: number;
  speedKh?: number;
  type?: string;
  time?: number;
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

export interface ILog extends Document {
  _id?: mongoose.ObjectId;
  event: string;
  action: string;
  timestamp: number;
  lat: number;
  lng: number;
}

export interface ICompany extends Document {
  _id?: mongoose.ObjectId;
  name: string;
  materials: string[];
  address: string;
  lat: number;
  lng: number;
  logs: ILog[];
  username: string;
  password: string;
  role: IRole;
  tokenVersion: number;
}

export interface IDriver extends Document {
  _id?: mongoose.ObjectId;
  name: string;
  username: string;
  password: string;
  plate: string;
  company: ICompany;
  lat: number;
  lng: number;
  material: string;
  role: IRole;
  tokenVersion: number;
}
