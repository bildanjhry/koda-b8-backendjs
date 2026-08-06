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

/**
 * @swagger
 * /carts/{id}:
 *    get:
 *     description: Get Carts details
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
 *          description: Success Get User's cart
 *        "400":
 *          description: Cart not found
 *     security:
 *        - token: []
 */
cartRoutes.get("/:id", cartControllers.GetCartDetail)

/**
 * @swagger
 * /carts/user/{id_user}:
 *    get:
 *     description: Get Carts details
 *     tags:
 *      - Carts
 *     parameters:
 *        - name: id_user
 *          in: path
 *          description: User's id
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *        "200":
 *          description: Success Get User's cart
 *        "400":
 *          description: Cart not found
 *     security:
 *        - token: []
 */
cartRoutes.get("/user/:id_user", cartControllers.GetCartDetailByUser)


/**
 * @swagger
 * /carts/{id_user}:
 *   post:
 *     description: Add new cart items
 *     tags:
 *      - Carts
 *     parameters:
 *       - in: path
 *         required: true
 *         name: id_user
 *         description: User's Id
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Add new cart items
 *       content:
 *         application/x-www-form-urlencoded:
 *             schema:
 *                type: object
 *                properties:
 *                   id_product:
 *                     type: integer
 *                   quantity:
 *                     type: integer
 *     responses:
 *      "200": 
 *        description: Success add cart items
 *      "500":
 *        description: Internal server error
 *     security:
 *        - token: []
 */
cartRoutes.post("/:id_user", cartControllers.CreateCart)

export default cartRoutes