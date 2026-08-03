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
 *               fullname:
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

/**
 * @swagger
 * /auth/forgot-password:
 *  post:
 *   description: Forgot Password
 *   tags:
 *     - Auth
 *   requestBody:
 *     description: Renew Passoword
 *     content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *   responses:
 *     "200":
 *       description: Success Renew Password
 *     "404":
 *       description: Email not found 
*/
authRoutes.post("/forgot-password", authControllers.ForgotPass)

export default authRoutes