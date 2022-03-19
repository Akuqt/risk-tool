import { app } from "./helper";
import { wsrequest } from "wsreq";
import { DriverLocation } from "types";

import mongoose from "mongoose";
import { DriverModel } from "../src/models";
import { connect } from "../src/database";

const driverInfo: DriverLocation = {
  id: "",
  lat: 1,
  lng: 2,
  speed: 1,
  tmp: 1212121212,
};

beforeAll(async () => {
  await connect();
  await DriverModel.deleteMany({ username: "some" });
  const _driver = new DriverModel({
    username: "some",
    password: "nick",
  });
  const driver = await _driver.save();
  driverInfo.id = driver._id?.toString() || "";
});

afterAll(async () => {
  await mongoose.connection.close(true);
});

describe("WS /api/v1/ws (ping)", () => {
  it("should fire the event", async () => {
    const [conn1] = await wsrequest(app, {
      config: {
        path: "/api/v1/ws",
      },
    });
    expect(conn1.connection.connected).toBeTruthy();
    expect(conn1.connection.id).toBeDefined();
    const res = await conn1.emit("ping", { test: "data" }).on("pong");
    expect(res).toEqual({ test: "data" });
    conn1.close();
  });
});

describe("WS /api/v1/ws (save:driver:location)", () => {
  it("should fire the event", async () => {
    const [conn1] = await wsrequest(app, {
      config: {
        path: "/api/v1/ws",
      },
    });
    expect(conn1.connection.connected).toBeTruthy();
    expect(conn1.connection.id).toBeDefined();
    const res = await conn1
      .emit("save:driver:location", driverInfo)
      .on<DriverLocation>("update:driver");
    expect(res.lat).toBe(driverInfo.lat);
    expect(res.lng).toBe(driverInfo.lng);
    expect(res.id).toBe(driverInfo.id);
    conn1.close();
  });

  it("should fire the event without response (1)", async () => {
    const [conn1] = await wsrequest(app, {
      config: {
        path: "/api/v1/ws",
      },
    });
    expect(conn1.connection.connected).toBeTruthy();
    expect(conn1.connection.id).toBeDefined();
    try {
      await conn1.emit("save:driver:location").on("driver:update");
    } catch (error) {
      expect(error).toBeDefined();
    }
    conn1.close();
  });

  it("should fire the event without response (2)", async () => {
    const [conn1] = await wsrequest(app, {
      config: {
        path: "/api/v1/ws",
      },
    });
    expect(conn1.connection.connected).toBeTruthy();
    expect(conn1.connection.id).toBeDefined();
    try {
      await conn1
        .emit("save:driver:location", { id: "dsfdfgdff" })
        .on("driver:update");
    } catch (error) {
      expect(error).toBeDefined();
    }
    conn1.close();
  });

  it("should fire the event without response (3)", async () => {
    const [conn1] = await wsrequest(app, {
      config: {
        path: "/api/v1/ws",
      },
    });
    expect(conn1.connection.connected).toBeTruthy();
    expect(conn1.connection.id).toBeDefined();
    try {
      await conn1
        .emit("save:driver:location", { id: "6231ff99810c15ca985658ee" })
        .on("driver:update");
    } catch (error) {
      expect(error).toBeDefined();
    }
    conn1.close();
  });
});
