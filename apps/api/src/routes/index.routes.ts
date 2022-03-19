import { Router } from "express";
import { index } from "../controllers";
import risk from "./risk.routes";
import report from "./report.routes";
import path from "./path.routes";
import auth from "./auth.routes";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Index
 *  description: Index endpoint
 */

/**
 * @swagger
 * /:
 *  get:
 *   summary: Index route
 *   tags: [Index]
 *   responses:
 *    200:
 *      description: Returns Hello message
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              msg: "Hello"
 *
 */
router.get("/", index);

router.use("/risk", risk);

router.use("/report", report);

router.use("/path", path);

router.use("/auth", auth);

export default router;
