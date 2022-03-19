/**
 *
 * @param {string} route route name
 * @param {string} controller controller name
 * @returns {string} test template
 */
export const testTemplate = (
  route,
  controller,
) => `import { simpleGet } from "./helper";

describe("GET /api/v1/${route}", () => {
  it("should get msg", async () => {
    const res = await simpleGet("/${route}");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ msg: "Hello ${controller}" });
  });
});
`;
