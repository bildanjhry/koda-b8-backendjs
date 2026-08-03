import { Router } from "express";
import * as prodControllers from "../controllers/prod.ctrl.js"
import authMiddleware from "../middlewares/auth.js";

const prodRoutes = Router()
/**
 * @swagger
 * /products:
 *    get:
 *     description: Get All Products
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
 *           default: 5
 *         description: Number of items per page
 *     responses:
 *        "200":
 *          description: Success Get All Products
 *        "500":
 *          description: Internal Server Error
 */
prodRoutes.get("", prodControllers.GetAllProducts)

/**
 * @swagger
 * /products/{slugs}:
 *    get:
 *     description: Get Products details
 *     tags:
 *      - Products
 *     parameters:
 *        - name: slugs
 *          in: path
 *          description: Products slugs
 *          required: true
 *          schema:
 *            type: string
 *     responses:
 *        "200":
 *          description: Success Get Products
 *        "400":
 *          description: Products not found
 */
prodRoutes.get("/:slugs", prodControllers.GetProductDetails)

export default prodRoutes