import mongoose from "mongoose";
import { simplePost } from "./helper";
import { connect } from "../src/database";
const expRisk = 61.30306325901758;

beforeAll(() => {
  connect();
});

afterAll(async () => {
  await mongoose.connection.close(true);
});

describe("Post /api/v1/risk", () => {
  it("should get msg", async () => {
    const res = await simplePost("/risk", {
      values: ["9", "9", "9", "9", "9", "0", "0", "0", "0", "0", "0"],
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.result).toEqual(expRisk);
  });
});
