import { expRisk, riskPayload, simplePost } from "./helper";

describe("Post /api/v1/risk", () => {
  it("should get msg", async () => {
    const res = await simplePost("/risk", riskPayload);
    expect(res.statusCode).toEqual(200);
    expect(res.body.result).toEqual(expRisk);
  });
});
