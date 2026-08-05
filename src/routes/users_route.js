import { Router } from "express";
import * as usersControllers from "../controllers/users.ctrl.js"

const usersRoutes = Router()

/**
 * @swagger
 * /users/checkout-histories:
 *   get:
 *    description: Get all available users checkout
 *    tags:
 *      - Users
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
 *        description: Success get all users's checkout histories
 *      "500":
 *        description: Internal server error      
*/
usersRoutes.get("/checkout-histories", usersControllers.GetUsersCheckoutHis)
export default usersRoutes