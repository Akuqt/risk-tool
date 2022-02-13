import { Response, Request } from "express";
import { spawnSync } from "child_process";

export const getRisk = (req: Request, res: Response) => {
  const { values } = req.body;
  const data = spawnSync("python", ["python/risk.py", ...values]);
  const result = data.stdout.toString("utf8").replace("\r\n", "");
  return res.json({
    result: parseFloat(result) * 10,
  });
};
