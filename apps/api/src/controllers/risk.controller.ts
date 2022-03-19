import { Response, Request } from "express";
import { spawnSync } from "child_process";
import { resolve } from "path";

export const getRisk = (req: Request, res: Response) => {
  const { values } = req.body;
  const data = spawnSync("python", [
    resolve(__dirname, "../../python/risk.py"),
    ...values,
  ]);
  const result = data.stdout.toString("utf8").replace("\r\n", "");
  return res.json({
    result: parseFloat(result) * 10,
  });
};
