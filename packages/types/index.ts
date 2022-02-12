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
