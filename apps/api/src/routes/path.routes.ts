import { validateToken } from "../middlewares";
import { Router } from "express";
import {
  getPath,
  endRoute,
  getBestPath,
  addRoutePath,
  getRoutePaths,
} from "../controllers";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Path
 *  description: Path endpoint
 */

/**
 * @swagger
 * /path:
 *  post:
 *   summary: Path between points
 *   tags: [Path]
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              points:
 *                type: array
 *                items:
 *                  type: object
 *                example:
 *                  [
 *                      {
 *                        lat: 10.997265,
 *                        lng: -74.814256
 *                      },
 *                      {
 *                        lat: 10.993805,
 *                        lng: -74.808798
 *                      }
 *                  ]
 *   responses:
 *    200:
 *      description: Returns calculated path
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              time:
 *                type: number
 *                example: 245
 *              distance:
 *                type: number
 *                example: 1213
 *              coords:
 *                type: array
 *                items:
 *                  type: object
 *                  example:
 *                       [
 *                        {
 *                          lat: 10.12121,
 *                          lng: -74.212121
 *                        },
 *                        {
 *                          lat: 10.1213311,
 *                          lng: -74.4211
 *                        }
 *                       ]
 *
 */
router.post("/", getPath);

router.post("/best", getBestPath);

router.post("/new", validateToken, addRoutePath);

router.post("/end", validateToken, endRoute);

router.get("/all", validateToken, getRoutePaths);

export default router;
