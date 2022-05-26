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
  lastname: "Doel",
  gender: "male",
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

export const invalidToken = (
  url: string,
  token: string,
): Promise<request.Response> => {
  return api.get(baseUrl + url).set("Authorization", "bearer " + token);
};

/* istanbul ignore next */
export const authPost = async (
  url: string,
  data: object,
  type: "in" | "up" = "up",
  drv?: boolean,
) => {
  const token = (await simplePost("/auth/sign-" + type, drv ? driver : company))
    .body.result.token;
  return api
    .post(baseUrl + url)
    .set("Authorization", `bearer ${token}`)
    .send(data);
};

/* istanbul ignore next */
export const authPut = async (
  url: string,
  data: object,
  type: "in" | "up" = "up",
  drv?: boolean,
) => {
  const token = (await simplePost("/auth/sign-" + type, drv ? driver : company))
    .body.result.token;
  return api
    .put(baseUrl + url)
    .set("Authorization", `bearer ${token}`)
    .send(data);
};

export const saveDriver = async () => {
  const res1 = await simplePost("/auth/sign-up", company);
  const res = await simplePost("/auth/sign-up", driver);
  /* istanbul ignore next */
  return {
    dvr: res.body.result.id,
    cpn: res1.body?.result?.id || "",
  };
};

/* istanbul ignore next */
export const authGet = async (
  url: string,
  type: "in" | "up" = "up",
  drv?: boolean,
) => {
  const token = (await simplePost("/auth/sign-" + type, drv ? driver : company))
    .body.result.token;
  return api.get(baseUrl + url).set("Authorization", `bearer ${token}`);
};
