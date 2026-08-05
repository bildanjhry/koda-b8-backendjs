import { Router } from "express";
import * as paymentControllers from "../controllers/payment.ctrl.js"
import authMiddleware from "../middlewares/auth.js";

const paymentRoutes = Router()
paymentRoutes.use(authMiddleware)

/**
 * @swagger
 * /payment-methods:
 *   post:
 *    description: Add new payment method
 *    tags:
 *      - Payment Methods
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
 *        description: Success add new payment method
 *      "500":
 *        description: Internal Server Error
 *    security:
 *       - token: []
 *     
*/
paymentRoutes.post("", paymentControllers.CreatePayment)

/**
 * @swagger
 * /payment-methods:
 *    get:
 *     description: Get All Payment method
 *     tags:
 *      - Payment Methods
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
 *          description: Success Get All Payments
 *        "500":
 *          description: Internal Server Error
 *     security:
 *        - token: []
 */
paymentRoutes.get("", paymentControllers.GetAllPayments)

export default paymentRoutes