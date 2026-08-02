import { Router } from "express";
import * as authControllers from "../controllers/auth.ctrl.js"

const authRoutes = Router()
authRoutes.post("/register", authControllers.Register)
authRoutes.post("/login", authControllers.Login)

export default authRoutes