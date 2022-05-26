import { authGet, authPost, saveDriver, simplePost } from "./helper";

import mongoose from "mongoose";
import { CompanyModel, DriverModel, RouteModel } from "../src/models";
import { connect } from "../src/database";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await mongoose.connection.close(true);
});

beforeAll(async () => {
  await CompanyModel.deleteMany({});
  await DriverModel.deleteMany({});
  await RouteModel.deleteMany({});
});

describe("POST /api/v1/path", () => {
  it("should get path", async () => {
    const res = await simplePost("/path", {
      points: [
        { lat: 10.997265, lng: -74.814256 },
        { lat: 10.993805, lng: -74.808798 },
      ],
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.distance).toBeDefined();
    expect(res.body.time).toBeDefined();
    expect(res.body.coords).toBeDefined();
  });
});

describe("POST /api/v1/path/best", () => {
  it("should get best path", async () => {
    const res = await simplePost("/path/best", {
      origin: { lat: 10.997265, lng: -74.814256 },
      destination: { lat: 10.993805, lng: -74.808798 },
    });
    const res_ = res.body.result;
    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toBeTruthy();
    expect(res_).toBeDefined();
    expect(res_).toBeInstanceOf(Array);
    expect(res_.length).toBeGreaterThanOrEqual(1);
    expect(res_[0].coords).toBeInstanceOf(Array);
    expect(res_[0].coords.length).toBeGreaterThanOrEqual(1);
  });

  it("shouldn't get best path (1)", async () => {
    const res = await simplePost("/path/best", {
      origin: { lat: 10.997265, lng: -74.814256 },
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.ok).toBeFalsy();
  });

  it("shouldn't get best path (2)", async () => {
    const res = await simplePost("/path/best", {
      destination: { lat: 10.997265, lng: -74.814256 },
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.ok).toBeFalsy();
  });
});

describe("GET /api/v1/path/all", () => {
  it("should get all company's routes", async () => {
    const res = await authGet("/path/all");
    const res_ = res.body.result;
    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toBeTruthy();
    expect(res_).toBeDefined();
    expect(res_).toBeInstanceOf(Array);
  });
});

describe("POST /api/v1/path/new", () => {
  it("should add a new route", async () => {
    const driver = (await saveDriver()).dvr;
    const res = await authPost(
      "/path/new",
      {
        time: 10,
        distance: 1000,
        material: "Risky",
        driver,
        risk: 10,
        address: "Calle falsa 123",
        dlat: 10,
        dlng: -74,
        fixed: [
          { lat: 10, lng: -74 },
          { lat: 11, lng: -75 },
        ],
      },
      "in",
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toBeTruthy();
  });
});

describe("POST /api/v1/path/end", () => {
  it("should end a route", async () => {
    const res = await authPost(
      "/path/end",
      {
        current: { lat: 10, lng: -74 },
        destination: { lat: 10, lng: -74.00001 },
      },
      "in",
      true,
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toBeTruthy();
  });

  it("shouldn't end a route (1)", async () => {
    const res = await authPost(
      "/path/end",
      {
        current: { lat: 10, lng: -74 },
      },
      "in",
      true,
    );
    expect(res.statusCode).toEqual(400);
    expect(res.body.ok).toBeFalsy();
  });

  it("shouldn't end a route (2)", async () => {
    const res = await authPost(
      "/path/end",
      {
        destination: { lat: 10, lng: -74.00001 },
      },
      "in",
      true,
    );
    expect(res.statusCode).toEqual(400);
    expect(res.body.ok).toBeFalsy();
  });

  it("shouldn't end a route (3)", async () => {
    const res = await authPost(
      "/path/end",
      {
        current: { lat: 10, lng: -74 },
        destination: { lat: 10, lng: -75 },
      },
      "in",
      true,
    );
    expect(res.statusCode).toEqual(400);
    expect(res.body.ok).toBeFalsy();
  });
});
