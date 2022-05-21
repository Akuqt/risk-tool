import { newAlert, setLogAction, getCompanyAlerts } from "../controllers";
import { validateToken } from "../middlewares";
import { Router } from "express";

const router = Router();

router.post("/new", validateToken, newAlert);
router.get("/all", validateToken, getCompanyAlerts);
router.put("/edit", validateToken, setLogAction);

export default router;
