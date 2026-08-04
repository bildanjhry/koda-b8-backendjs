import { Router } from "express";
import * as profileControllers from "../controllers/profile.ctrl.js"
import authMiddleware from "../middlewares/auth.js";
import permissionsMiddleware from "../middlewares/permissions.js";

const profileRoutes = Router()
/**
 * @swagger
 * /profiles:
 *   get:
 *    description: Get all available user's profile
 *    tags:
 *     - Profiles
 *    responses:
 *      "200":
 *        description: Success get all profiles
 *      "500":
 *        description: Internal server error
 *    security:
 *      - token: []
*/
profileRoutes.get("", authMiddleware, permissionsMiddleware, profileControllers.GetAllProfile)

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *    description: Get all available user's profile
 *    tags:
 *     - Profiles
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id user
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: Success get all profiles
 *      "500":
 *        description: Internal server error
 *    security:
 *      - token: []
*/
profileRoutes.get("/:id", authMiddleware, profileControllers.GetProfileDetail)


/**
 * @swagger
 * /profiles/{id}:
 *   patch:
 *    description: Update user's profile
 *    tags:
 *     - Profiles
 *    parameters:
 *      - in: path
 *        name: id
 *        description: id user
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *       description: Update users profile
 *       content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                 type: object
 *                 properties:
 *                    fullname:
 *                      type: string
 *                    username:
 *                      type: string
 *                    email:
 *                      type: string
 *                    phone:
 *                      type: string
 *    responses:
 *      "200":
 *        description: Success update profiles
 *      "500":
 *        description: Internal server error
 *    security:
 *      - token: []
*/
profileRoutes.patch("/:id", authMiddleware, profileControllers.UpdateProfile)

export default profileRoutes