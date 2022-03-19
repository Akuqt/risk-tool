import mongoose from "mongoose";
import { company, driver, simplePost } from "./helper";
import { CompanyModel, DriverModel } from "../src/models";
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
});

describe("POST /api/v1/auth/sign-up", () => {
  it("should register a new company", async () => {
    const res = await simplePost("/auth/sign-up", company);
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body.result).toBeDefined();
  });

  it("shouldn't register a new company", async () => {
    const res = await simplePost("/auth/sign-up", {
      ...company,
      name: "Company1",
    });
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
  });

  it("should register a new driver", async () => {
    const res = await simplePost("/auth/sign-up", driver);
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body.result).toBeDefined();
  });

  it("shouldn't register a new driver", async () => {
    const res = await simplePost("/auth/sign-up", {
      ...driver,
      company: "driver2",
    });
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
  });

  it("shouldn't register anything", async () => {
    const res = await simplePost("/auth/sign-up", {
      ...company,
      type: "idk",
    });
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
  });
});

describe("POST /api/v1/auth/sign-in", () => {
  it("should login a company", async () => {
    const res = await simplePost("/auth/sign-in", company);
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body.result).toBeDefined();
  });

  it("shouldn't login a company (1)", async () => {
    const res = await simplePost("/auth/sign-in", {
      ...company,
      username: "idk",
    });
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
  });

  it("shouldn't login a company (2)", async () => {
    const res = await simplePost("/auth/sign-in", {
      ...company,
      password: "idk",
    });
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
  });

  it("should login a driver", async () => {
    const res = await simplePost("/auth/sign-in", driver);
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body.result).toBeDefined();
  });

  it("shouldn't login a driver (1)", async () => {
    const res = await simplePost("/auth/sign-in", {
      ...driver,
      username: "idk",
    });
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
  });

  it("shouldn't login a driver (2)", async () => {
    const res = await simplePost("/auth/sign-in", {
      ...driver,
      password: "idk",
    });
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
  });

  it("shouldn't login anything", async () => {
    const res = await simplePost("/auth/sign-in", {
      ...company,
      type: "idk",
    });
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
  });
});
