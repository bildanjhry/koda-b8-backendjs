import { Router } from "express"
import authRoutes from "./auth_route.js"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import prodRoutes from "./prod_route.js"
import authMiddleware from "../middlewares/auth.js"
import catRoutes from "./cat_route.js"
import profileRoutes from "./profile_route.js"
import cartRoutes from "./cart_route.js"
import sizesRoutes from "./sizes_route.js"
import colorsRoutes from "./colors_route.js"
import prodVarRoutes from "./product_var_route.js"

const swaggerOpt = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BeliMudah Backend",
      version: "1.0.0",
      description: "API Documetation for BeliMudah web app",
    },
    components: {
      securitySchemes: {
        token: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description:`Insert Bearer before token`
        }
      }
    }
  },
  apis: ["./src/routes/*route.js"],
}

const swagger = swaggerJSDoc(swaggerOpt)

const routes = Router()
routes.use("/auth", authRoutes)
routes.use("/categories", catRoutes)
routes.use("/products", prodRoutes)
routes.use("/profiles", profileRoutes)
routes.use("/carts", cartRoutes)
routes.use("/sizes", sizesRoutes)
routes.use("/colors", colorsRoutes)
routes.use("/products-variants", prodVarRoutes)
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger))

export default routes