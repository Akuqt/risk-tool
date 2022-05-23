import { validateToken } from "../middlewares";
import { Router } from "express";
import {
  newAlert,
  setLogAction,
  getDriverLogs,
  getCompanyAlerts,
} from "../controllers";

const router = Router();

router.post("/new", validateToken, newAlert);
router.get("/all", validateToken, getCompanyAlerts);
router.put("/edit", validateToken, setLogAction);
router.get("/driver", validateToken, getDriverLogs);

export default router;
