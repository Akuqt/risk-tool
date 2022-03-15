/* eslint-disable jest/no-disabled-tests */
import { simpleGet } from "./helper";

describe("GET /api/v1/auth", () => {
  xit("should get msg", async () => {
    const res = await simpleGet("/auth");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ msg: "Hello signIn" });
  });
});
