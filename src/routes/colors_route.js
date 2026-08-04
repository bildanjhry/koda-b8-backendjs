import { Router } from "express"
import * as colorsControllers from "../controllers/colors.ctrl.js"
import authMiddleware from "../middlewares/auth.js"
import permissionsMiddleware from "../middlewares/permissions.js"

const colorsRoutes = Router()
/**
 * @swagger
 * /colors:
 *   post:
 *     description: Add new colors
 *     tags:
 *       - Colors
 *     requestBody:
 *       description: Create new Color
 *       content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                 type: object
 *                 required:
 *                    - name
 *                    - hex
 *                 properties:
 *                    name:
 *                      type: string
 *                    hex:
 *                      type: string
 *     responses:
 *       "200":
 *          description: Success add new category
 *       "400":
 *          description: Invalid input
 *     security:
 *       - token: []
*/
colorsRoutes.post("", authMiddleware, permissionsMiddleware, colorsControllers.AddColor)

/**
 * @swagger
 * /colors:
 *   get:
 *    description: Get All Available Colors
 *    tags:
 *     - Colors
 *    responses:
 *      "200":
 *        description: Success get all colors
 *      "500":
 *        description: Internal Server Error
*/
colorsRoutes.get("", colorsControllers.GetAllColors)

/**
 * @swagger
 * /colors/{id}:
 *    get:
 *     description: Get Color details
 *     tags:
 *      - Colors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Color's id
 *     responses:
 *       "200":
 *         description: Success Get Color Detail
 *       "400":
 *         description: Color not found
*/
colorsRoutes.get("/:id", colorsControllers.GetColorDetail)

export default colorsRoutes