import { Router } from "express"
import authRoutes from "./auth_route.js"

const routes = Router()
routes.use("/auth", authRoutes)

export default routes