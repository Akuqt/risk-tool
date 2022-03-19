import { getAlerts, getTraffic } from "../controllers";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Report
 *  description: Report endpoint
 */

/**
 * @swagger
 * /report/alerts:
 *  post:
 *   summary: Traffic Alerts
 *   tags: [Report]
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              lat: number
 *              lng: number
 *            example:
 *              lat: 10.997265
 *              lng: -74.814256
 *   responses:
 *    200:
 *      description: Returns alerts near the zone
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              result:
 *                type: array
 *                items:
 *                  type: object
 *                  example:
 *                    city: "some city"
 *                    type': "ROAD_CLOSED"
 *                    location:
 *                      lat: 10.12121
 *                      lng: -74.212121
 *                    description: "Report description"
 *                    street: "Some street"
 *                    date: 192192192219
 *
 */

router.post("/alerts", getAlerts);

/**
 * @swagger
 * /report/traffic:
 *  post:
 *   summary: Traffic Jams
 *   tags: [Report]
 *   requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              lat: number
 *              lng: number
 *            example:
 *              lat: 10.997265
 *              lng: -74.814256
 *   responses:
 *    200:
 *      description: Returns jams near the zone
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              result:
 *                type: array
 *                items:
 *                  type: object
 *                  example:
 *                    city: "some city"
 *                    speedKh': 12
 *                    path:
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
 *                    description: "Report description"
 *                    street: "Some street"
 *                    date: 192192192219
 *                    level: 6
 *                    time: 312
 *                    d: 1220
 *
 */
router.post("/traffic", getTraffic);

export default router;
