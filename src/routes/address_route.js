import { Router } from "express";
import * as addressControllers from "../controllers/address.ctrl.js"
import authMiddleware from "../middlewares/auth.js";

const addressRoutes = Router()
addressRoutes.use(authMiddleware)
/**
 * @swagger
 * /address/user/{id}:
 *   get:
 *    description: Get Addres by user id
 *    tags:
 *      - Address
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User's id
 *         schema:
 *           type: string
 *    responses:
 *     "200":
 *       description: Success get address
 *     "400":
 *       description: Address not found
 *    security:
 *      - token: []
*/
addressRoutes.get("/user/:id", addressControllers.GetAddressByUser)


/**
 * @swagger
 * /address:
 *   post:
 *     description: Add new user address
 *     tags:
 *       - Address
 *     requestBody:
 *        content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                 type: object
 *                 properties:
 *                    fulladdress:
 *                      type: string
 *                    province:
 *                      type: string
 *                    city:
 *                      type: string
 *                    postcode:
 *                      type: integer
 *                    optional:
 *                      type: string
 *     responses:
 *       "200": 
 *         description: Success add new address
 *       "500":
 *         description: Internal server error
 *     security:
 *        - token: []
*/
addressRoutes.post("", addressControllers.CreateAddress)
export default addressRoutes