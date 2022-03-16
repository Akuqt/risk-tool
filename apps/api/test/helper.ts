import request from "supertest";
import app_ from "../src/app";

export const app = app_;
export const api = request(app);

export const location = {
  lat: 11.007100105286,
  lng: -74.809196472168,
};

export const driver = {
  type: "driver",
  name: "Jhon",
  plate: "Ea1u1",
  company: "Company1",
  material: "O2",
  username: "driver1",
  password: "1234",
};

export const company = {
  type: "company",
  lat: 10.997265,
  lng: -74.814256,
  address: "fake street 123",
  name: "Company1",
  materials: ["water", "O2"],
  username: "company1",
  password: "1234",
};

export const expRisk = 61.30306325901758;

export const riskPayload = {
  values: ["9", "9", "9", "9", "9", "0", "0", "0", "0", "0", "0"],
};

const baseUrl = "/api/v1";

export const simplePost = (
  url: string,
  data: object,
): Promise<request.Response> => {
  return api.post(baseUrl + url).send(data);
};

export const simpleGet = (url: string): Promise<request.Response> => {
  return api.get(baseUrl + url);
};
