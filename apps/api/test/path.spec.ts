import { simplePost } from "./helper";

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
