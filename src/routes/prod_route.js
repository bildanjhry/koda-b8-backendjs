import { Router } from "express";
import * as prodControllers from "../controllers/prod.ctrl.js"
import authMiddleware from "../middlewares/auth.js";
import permissionsMiddleware from "../middlewares/permissions.js";
import uploadMiddleware from "../middlewares/upload.js";

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
 *           default: 20
 *         description: Limit data
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


/**
 * @swagger
 * /products:
 *   post:
 *     description: Add new product
 *     tags:
 *      - Products
 *     requestBody:
 *       description: Add new product
 *       content:
 *         multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   title:
 *                     type: string
 *                   price:
 *                     type: integer
 *                   file:
 *                     type: string
 *                     format: binary
 *                   alt:
 *                     type: string
 *                   description:
 *                     type: string
 *     responses:
 *      "200": 
 *        description: Success add product
 *      "500":
 *        description: Internal server error
 *     security:
 *        - token: []
 */
prodRoutes.post("", 
    authMiddleware, 
    permissionsMiddleware, 
    uploadMiddleware("file"),
    prodControllers.AddProduct)

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     description: Update data product
 *     tags:
 *      - Products
 *     parameters:
 *        - in: path
 *          name: id
 *          description: product's id
 *          required: true
 *          schema:
 *             type: string
 *     requestBody:
 *       description: Update data product
 *       content:
 *         multipart/form-data:
 *             schema:
 *                type: object
 *                properties:
 *                   title:
 *                     type: string
 *                   price:
 *                     type: integer
 *                   file:
 *                     type: string
 *                     format: binary
 *                   alt:
 *                     type: string
 *                   description:
 *                     type: string
 *     responses:
 *      "200": 
 *        description: Success add product
 *      "500":
 *        description: Internal server error
 *     security:
 *        - token: []
 */
prodRoutes.patch("/:id", 
    authMiddleware, 
    permissionsMiddleware, 
    uploadMiddleware("file"),
    prodControllers.UpdateProduct)

/**
 * @swagger
 * /products/{id}/reviews:
 *    post:
 *     description: Add reviews to product
 *     tags:
 *      - Products
 *     parameters:
 *      - in: path
 *        name: id
 *        description: Product's id
 *        required: true
 *        schema:
 *           type: string
 *     requestBody:
 *        description: Add reviews
 *        content:
 *          application/x-www-form-urlencoded:
 *             schema:
 *                type: object
 *                properties:
 *                   rating:
 *                     type: integer
 *                     enum: [1, 2, 3, 4, 5]
 *                   comment:
 *                     type: string 
 *     responses:
 *      "200":
 *        description: Success add reviews
 *      "400":
 *        description: Product not found
 *     security:
 *        - token: []
 *  
 */    
prodRoutes.post("/:id/reviews", authMiddleware, prodControllers.AddRatingProduct)

export default prodRoutes