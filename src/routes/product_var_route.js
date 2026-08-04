import { Router } from "express";
import * as prodVarControllers from "../controllers/product_var.ctrl.js"
import authMiddleware from "../middlewares/auth.js";
import permissionsMiddleware from "../middlewares/permissions.js";
import uploadMiddleware from "../middlewares/upload.js";

const prodVarRoutes = Router()
/**
 * @swagger
 * /products-variants:
 *    get:
 *     description: Get All Products variants
 *     tags:
 *      - Products
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
 *          description: Success Get All Products
 *        "500":
 *          description: Internal Server Error
 */
prodVarRoutes.get("", prodVarControllers.GetAllProductsVar)

/**
 * @swagger
 * /products-variants/{id}:
 *    get:
 *     description: Get Products details
 *     tags:
 *      - Products
 *     parameters:
 *        - name: id
 *          in: path
 *          description: Products id
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *        "200":
 *          description: Success Get Products
 *        "400":
 *          description: Products not found
 */
prodVarRoutes.get("/:id", prodVarControllers.GetProductVarDetails)


/**
 * @swagger
 * /products-variants:
 *   post:
 *     description: Add new product variants
 *     tags:
 *      - Products
 *     requestBody:
 *       description: Add new product variants
 *       content:
 *         application/x-www-form-urlencoded:
 *             schema:
 *                type: object
 *                properties:
 *                   id_product:
 *                     type: integer
 *                   id_color:
 *                     type: integer
 *                   id_size:
 *                     type: integer
 *                   stocks:
 *                     type: integer
 *                   price:
 *                     type: integer
 *                   sku:
 *                     type: string
 *     responses:
 *      "200": 
 *        description: Success add product
 *      "500":
 *        description: Internal server error
 *     security:
 *        - token: []
 */
prodVarRoutes.post("", 
    authMiddleware, 
    permissionsMiddleware, 
    prodVarControllers.AddProductVar)

export default prodVarRoutes