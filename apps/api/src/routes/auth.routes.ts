import { signIn, signUp, editCompany, getCompanies } from "../controllers";
import { validateToken } from "../middlewares";
import { Router } from "express";

const router = Router();

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.put("/edit-company", validateToken, editCompany);

router.get("/all", validateToken, getCompanies);

export default router;
