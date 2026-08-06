import { Router } from "express";
import * as addressControllers from "../controllers/address.ctrl.js"

const addressRoutes = Router()

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
*/
addressRoutes.get("/user/:id", addressControllers.GetAddressByUser)
export default addressRoutes