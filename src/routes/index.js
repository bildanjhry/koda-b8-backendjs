import { Router } from "express"
import authRoutes from "./auth_route.js"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"

const swaggerOpt = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BeliMudah Backend",
      version: "1.0.0",
      description: "API Documetation for BeliMudah web app",
    },
    component: {
      securitySchemes: {
        token: {
          type: "apiKey",
          name: "Authorization",
          in: "header"
        }
      }
    }
  },
  apis: ["./src/routes/*route.js"],
}

const swagger = swaggerJSDoc(swaggerOpt)

const routes = Router()
routes.use("/auth", authRoutes)
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger))

export default routes