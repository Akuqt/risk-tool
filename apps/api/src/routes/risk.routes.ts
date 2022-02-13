import { Router } from "express";
import { getRisk } from "../controllers";

const router = Router();

router.post("/", getRisk);

export default router;
