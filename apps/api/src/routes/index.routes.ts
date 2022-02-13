import { Router } from "express";
import { index } from "../controllers";

import risk from "./risk.routes";

const router = Router();

router.get("/", index);

router.use("/risk", risk);

export default router;
