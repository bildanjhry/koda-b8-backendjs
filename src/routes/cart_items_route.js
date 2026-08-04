import { Router } from "express";
import * as cartControllers from "../controllers/cart.ctrl.js"


const cartItemsRoutes = Router()

/**
 * @swagger
 * /carts-items/{id}:
 *    get:
 *     description: Get Cart items details
 *     tags:
 *      - Carts
 *     parameters:
 *        - name: id
 *          in: path
 *          description: Cart's id
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *        "200":
 *          description: Success Get User's cart items
 *        "400":
 *          description: Cart not found
 *     security:
 *        - token: []
 */
cartItemsRoutes.get("/:id", cartControllers.GetCartItemsDetail)
export default cartItemsRoutes