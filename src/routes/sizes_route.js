import { Router } from "express"
import * as sizesControllers from "../controllers/sizes.ctrl.js"
import authMiddleware from "../middlewares/auth.js"
import permissionsMiddleware from "../middlewares/permissions.js"

const sizesRoutes = Router()
/**
 * @swagger
 * /sizes:
 *   post:
 *     description: Add new size
 *     tags:
 *       - Sizes
 *     requestBody:
 *       description: Create new Size
 *       content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                 type: object
 *                 required:
 *                    - name
 *                 properties:
 *                    name:
 *                      type: string
 *     responses:
 *       "200":
 *          description: Success add new category
 *       "400":
 *          description: Invalid input
 *     security:
 *       - token: []
*/
sizesRoutes.post("", authMiddleware, permissionsMiddleware, sizesControllers.AddSize)

/**
 * @swagger
 * /sizes:
 *   get:
 *    description: Get All Available Sizes
 *    tags:
 *     - Sizes
 *    responses:
 *      "200":
 *        description: Success get all categories
 *      "500":
 *        description: Internal Server Error
*/
sizesRoutes.get("", sizesControllers.GetAllSizes)

/**
 * @swagger
 * /sizes/{id}:
 *    get:
 *     description: Get Size details
 *     tags:
 *      - Sizes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Size's id
 *     responses:
 *       "200":
 *         description: Success Get Size Detail
 *       "400":
 *         description: Size not found
*/
sizesRoutes.get("/:id", sizesControllers.GetSizeDetail)

export default sizesRoutes