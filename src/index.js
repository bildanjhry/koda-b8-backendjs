import express from "express"
import routes from "./routes/index.js"
import { connectDB } from "./config/db.js"
import corsMiddleware from "./middlewares/cors.js"

const app = express()
app.use(express.urlencoded())
app.use(routes)
app.use(corsMiddleware)
await connectDB()

const PORT = process.env.SERVER_PORT || 8080
app.listen(PORT, function(){
    console.log("Listen to port "+ PORT)
})