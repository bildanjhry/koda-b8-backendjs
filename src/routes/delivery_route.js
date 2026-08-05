import { Router } from "express";
import * as deliveryControllers from "../controllers/delivery.ctrl.js"
import authMiddleware from "../middlewares/auth.js";

const deliveryRoutes = Router()
deliveryRoutes.use(authMiddleware)

/**
 * @swagger
 * /delivery-methods:
 *   post:
 *    description: Add new delivery method
 *    tags:
 *      - Delivery Methods
 *    requestBody:
 *      description: Add new payment method
 *      content:
 *         application/x-www-form-urlencoded:
 *             schema:
 *                type: object
 *                properties:
 *                    name:
 *                      type: string
 *    responses:
 *      "200":
 *        description: Success add new delivery method
 *      "500":
 *        description: Internal Server Error
 *    security:
 *       - token: []
 *     
*/
deliveryRoutes.post("", deliveryControllers.CreateDelivery)

/**
 * @swagger
 * /delivery-methods:
 *    get:
 *     description: Get All Delivery methods
 *     tags:
 *      - Delivery Methods
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Limit data
 *     responses:
 *        "200":
 *          description: Success Get All Deliveries
 *        "500":
 *          description: Internal Server Error
 *     security:
 *        - token: []
 */
deliveryRoutes.get("", deliveryControllers.GetAllDeliveries)

export default deliveryRoutes