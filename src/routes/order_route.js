import { Router } from "express";
import * as orderControllers from "../controllers/order.ctrl.js"
import authMiddleware from "../middlewares/auth.js";
import permissionsMiddleware from "../middlewares/permissions.js";

const orderRoutes = Router()
orderRoutes.use(authMiddleware)

/**
 * @swagger
 * /orders:
 *   get:
 *    description: Get all available user's order
 *    tags:
 *     - Orders
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
 *        description: Success get all users's orders
 *      "500":
 *        description: Internal server error
 *    security:
 *      - token: []
 */
orderRoutes.get("", orderControllers.GetAllOrder)

// /**
//  * @order.ctrl.jsger
//  * /carts/{id}:
//  *    get:
//  *     description: Get Carts details
//  *     tags:
//  *      - Carts
//  *     parameters:
//  *        - name: id
//  *          in: path
//  *          description: Cart's id
//  *          required: true
//  *          schema:
//  *            type: string
//  *     responses:
//  *        "200":
//  *          description: Success Get User's cart
//  *        "400":
//  *          description: Cart not found
//  *     security:
//  *        - token: []
//  */
// orderRoutes.get("/:id", orderControllers.GetCartDetail)


/**
 * @swagger
 * /orders:
 *   post:
 *     description: Add new order
 *     tags:
 *      - Orders
 *     requestBody:
 *       description: Add new order
 *       content:
 *         application/x-www-form-urlencoded:
 *             schema:
 *                type: object
 *                properties:
 *                   id_product:
 *                     type: integer
 *                   quantity:
 *                     type: integer
 *                   price:
 *                     type: integer
 *                   id_payment_method:
 *                      type: integer
 *                   id_delivery_method:
 *                      type: integer
 *     responses:
 *      "200": 
 *        description: Success add cart items
 *      "500":
 *        description: Internal server error
 *     security:
 *        - token: []
 */
orderRoutes.post("", orderControllers.CreateOrder)

export default orderRoutes