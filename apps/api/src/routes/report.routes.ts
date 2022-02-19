import { getAlerts, getTraffic } from "../controllers";
import { Router } from "express";

const router = Router();

router.post("/alerts", getAlerts);

router.post("/traffic", getTraffic);

export default router;
