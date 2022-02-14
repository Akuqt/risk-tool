import request from "supertest";
import app_ from "../src/app";

export const app = app_;
export const api = request(app);

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
