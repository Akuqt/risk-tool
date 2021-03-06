import { simpleGet } from "./helper";

describe("GET /api/v1", () => {
  it("should get msg", async () => {
    const res = await simpleGet("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ msg: "Hello" });
  });
});
