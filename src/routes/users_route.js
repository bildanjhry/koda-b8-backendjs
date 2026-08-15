import { Router } from "express";
import * as usersControllers from "../controllers/users.ctrl.js"
import permissionsMiddleware from "../middlewares/permissions.js";

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
 *   responses:
 *      "200":
 *        description: Success get all users's checkout histories
 *      "500":
 *        description: Internal server error
 *   security:
 *      - token: []      
*/
usersRoutes.get("/checkout-histories", permissionsMiddleware, usersControllers.GetUsersCheckoutHis)

/**
 * @swagger
 * /users/{id}/checkout-histories:
 *   get:
 *    description: Get all available users checkout
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        description: Limit data
 *    responses:
 *      "200":
 *        description: Success get all users's checkout histories
 *      "500":
 *        description: Internal server error
 *    security:
 *      - token: []      
*/
usersRoutes.get("/:id/checkout-histories", usersControllers.GetUserCheckoutHisById)

/**
 * @swagger
 * /users:
 *   get:
 *    description: Get all available users
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
 *        description: Success get all users
 *      "500":
 *        description: Internal server error
 *    security:
 *      - token: []      
*/
usersRoutes.get("", permissionsMiddleware, usersControllers.GetAllUsers)
export default usersRoutes