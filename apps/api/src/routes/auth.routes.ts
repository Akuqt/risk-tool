import { signIn, signUp, editCompany } from "../controllers";
import { validateToken } from "../middlewares";
import { Router } from "express";

const router = Router();

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.put("/edit-company", validateToken, editCompany);

export default router;
