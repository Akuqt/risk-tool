import { getRisk } from "../controllers";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Risk
 *  description: Risk endpoint
 */

/**
 * @swagger
 * /risk:
 *  post:
 *   summary: Risk calculator
 *   tags: [Risk]
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              values:
 *                type: array
 *                items:
 *                  type: number
 *                description: Array with params
 *            example:
 *              values: [9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0]
 *
 *   responses:
 *    200:
 *      description: Returns the params risk
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              result: 61.30306325901758
 *
 */

router.post("/", getRisk);

export default router;
