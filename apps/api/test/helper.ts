import request from "supertest";
import app_ from "../src/app";

export const app = app_;
export const api = request(app);

export const location = {
  lat: 11.007100105286,
  lng: -74.809196472168,
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
