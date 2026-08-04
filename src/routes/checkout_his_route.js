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
*/
checkoutHisRoutes.get("", permissionsMiddleware, checkoutHisCrtl.GetAllCheckoutHis)

export default checkoutHisRoutes