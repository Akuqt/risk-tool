import { Router } from "express";
import { index } from "../controllers";
import risk from "./risk.routes";
import report from "./report.routes";

const router = Router();

router.get("/", index);

router.use("/risk", risk);

router.use("/report", report);

export default router;
