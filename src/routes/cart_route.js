import { Router } from "express";
import * as cartControllers from "../controllers/cart.ctrl.js"
import authMiddleware from "../middlewares/auth.js";
import permissionsMiddleware from "../middlewares/permissions.js";

const cartRoutes = Router()
cartRoutes.use(authMiddleware)

/**
 * @swagger
 * /carts:
 *   get:
 *    description: Get all available user's cart
 *    tags:
 *     - Carts
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          default: 1
 *        description: Page number
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          default: 20
 *        description: Limit data
 *    responses:
 *      "200":
 *        description: Success get all users's cart
 *      "500":
 *        description: Internal server error
 *    security:
 *      - token: []
 */
cartRoutes.get("", permissionsMiddleware, cartControllers.GetAllCart)

export default cartRoutes