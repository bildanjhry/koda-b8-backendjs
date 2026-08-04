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


export default profileRoutes