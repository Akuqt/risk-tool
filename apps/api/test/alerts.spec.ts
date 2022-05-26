import mongoose from "mongoose";
import { authGet, authPost, authPut, saveDriver } from "./helper";
import { CompanyModel, DriverModel, LogModel } from "../src/models";
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
  await LogModel.deleteMany({});
});

describe("Post /api/v1/alerts/new", () => {
  it("should create an alert", async () => {
    const res_ = await saveDriver();
    const res = await authPost(
      "/alerts/new",
      {
        company: res_.cpn,
        reason: "test",
        description: "test",
        lat: 10,
        lng: -74,
        material: "test",
        destination: {
          lat: 11,
          lng: -75,
        },
      },
      "in",
      true,
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toBeTruthy();
  });
});

describe("GET /api/v1/alerts/all", () => {
  it("should get company's alerts", async () => {
    const res = await authGet("/alerts/all", "in");
    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toBeTruthy();
    expect(res.body.logs).toBeDefined();
  });
});

describe("PUT /api/v1/alerts/edit", () => {
  it("should update alert action", async () => {
    const logs = await LogModel.find();
    const res = await authPut(
      "/alerts/edit",
      { action: "Dismiss", log: logs[0]._id },
      "in",
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toBeTruthy();
  });
});

describe("GET /api/v1/alerts/driver", () => {
  it("should get driver's alerts", async () => {
    const res = await authGet("/alerts/driver", "in", true);
    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toBeTruthy();
    expect(res.body.result).toBeDefined();
  });
});
