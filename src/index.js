import express from "express"
import "babel-register"
import routes from "./routes/index.js"
import { connectDB } from "./config/db.js"
import corsMiddleware from "./middlewares/cors.js"

const app = express()
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded())
app.use(express.json())
app.use(corsMiddleware)
app.use(routes)
await connectDB()

const PORT = process.env.SERVER_PORT || 8081
app.listen(PORT, function(){
    console.log("Listen to port "+ PORT)
})