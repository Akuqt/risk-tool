import mongoose from "mongoose";
import { simpleGet, app } from "./helper";
import { wsrequest } from "wsreq";
import { connect } from "../src/database";

beforeAll(() => {
  connect();
});

afterAll(async () => {
  await mongoose.connection.close(true);
});

describe("GET /api/v1", () => {
  it("should get msg", async () => {
    const res = await simpleGet("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ msg: "Hello" });
  });
});

describe("WS /api/v1/ws", () => {
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
