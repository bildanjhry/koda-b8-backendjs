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
export default paymentRoutes