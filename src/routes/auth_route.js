import { Router } from "express";
import * as authControllers from "../controllers/auth.ctrl.js"

const authRoutes = Router()

/**
 * @swagger
 * /auth/register:
 *   post:
 *    description: Create Account Through Register
 *    tags:
 *     - Auth
 *    requestBody:
 *      description: Create new account
 *      content:
 *        application/x-www-form-urlencoded:
 *           schema:
 *            type: object
 *            properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                  type: string
 *    responses:
 *      "200":
 *         description: Success create account
 *      "404":
 *         description: Email already being used
 *    
*/
authRoutes.post("/register", authControllers.Register)


/**
 * @swagger
 * /auth/login:
 *   post:
 *    description: Login
 *    tags:
 *     - Auth
 *    requestBody:
 *      description: Login into system
 *      content:
 *        application/x-www-form-urlencoded:
 *           schema:
 *            type: object
 *            properties:
 *               email:
 *                 type: string
 *               password:
 *                  type: string
 *    responses:
 *      "200":
 *        description: Success Login
 *      "401":
 *        description: Unauthorized
 *    
*/
authRoutes.post("/login", authControllers.Login)

export default authRoutes