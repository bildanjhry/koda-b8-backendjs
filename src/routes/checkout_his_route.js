import { Router } from "express"
import * as checkoutHisCrtl from "../controllers/checkout_his.ctrl.js"
import authMiddleware from "../middlewares/auth.js"
import permissionsMiddleware from "../middlewares/permissions.js"

const checkoutHisRoutes = Router()
checkoutHisRoutes.use(authMiddleware)
/**
 * @swagger
 * /checkout-histories:
 *   get:
 *    description: Get All Available Checkout Histories
 *    tags:
 *     - Checkout Histories
 *    responses:
 *      "200":
 *        description: Success get all categories
 *      "500":
 *        description: Internal Server Error
 *    security:
 *      - token: []
*/
checkoutHisRoutes.get("", permissionsMiddleware, checkoutHisCrtl.GetAllCheckoutHis)


/**
 * @swagger
 * /checkout-histories/{id}:
 *   get:
 *    description: Get users Checkout Histories
 *    tags:
 *     - Checkout Histories
 *    parameters:
 *       - in: path
 *         name: id
 *         description: id
 *         required: true
 *         schema:
 *            type: string
 *    responses:
 *      "200":
 *        description: Success get checkout histories
 *      "500":
 *        description: Internal Server Error
 *    security:
 *      - token: []
*/
checkoutHisRoutes.get("/:id", checkoutHisCrtl.GetCheckoutHisById)

export default checkoutHisRoutes