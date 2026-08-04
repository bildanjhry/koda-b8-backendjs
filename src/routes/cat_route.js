import { Router } from "express"
import * as catControllers from "../controllers/cat.ctrl.js"

const catRoutes = Router()

/**
 * @swagger
 * /categories:
 *   post:
 *     description: Add new Category
 *     tags:
 *       - Categories
 *     requestBody:
 *       description: Create new Category
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
*/
catRoutes.post("", catControllers.AddCategory)

/**
 * @swagger
 * /categories:
 *   get:
 *    description: Get All Available Categories
 *    tags:
 *     - Categories
 *    responses:
 *      "200":
 *        description: Success get all categories
 *      "500":
 *        description: Internal Server Error
*/
catRoutes.get("", catControllers.GetAllCategory)
export default catRoutes