import { getPath } from "../controllers";
import { Router } from "express";

const router = Router();

router.post("/", getPath);

export default router;
