import { location, simplePost } from "./helper";

describe("Post /api/v1/report/alerts", () => {
  it("should get alerts", async () => {
    const res = await simplePost("/report/alerts", location);
    expect(res.statusCode).toEqual(200);
    expect(res.body.result).toBeDefined();
    expect(res.body.result.length).toBeGreaterThan(0);
    expect(res.body.result[0].location).toBeDefined();
    expect(res.body.result[0].type).toBeDefined();
  });
});

describe("Post /api/v1/report/traffic", () => {
  it("should get traffic info", async () => {
    const res = await simplePost("/report/traffic", location);
    expect(res.statusCode).toEqual(200);
    expect(res.body.result).toBeDefined();
    expect(res.body.result.length).toBeGreaterThan(0);
    expect(res.body.result[0].path.length).toBeGreaterThan(0);
    expect(res.body.result[0].time).toBeDefined();
  });
});
