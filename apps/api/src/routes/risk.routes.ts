import { getRisk } from "../controllers";
import { Router } from "express";

const router = Router();

router.post("/", getRisk);

export default router;
