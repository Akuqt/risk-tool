/**
 *
 * @param {string} controller controller name
 * @returns {string} controller template
 */
export const controllerTemplate = (
  controller,
) => `import { Request, Response } from "express";

export const ${controller} = (_req: Request, res: Response): Response => {
  return res.json({ msg: "Hello ${controller}" });
};
`;
