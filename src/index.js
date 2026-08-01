import express from "express"
import routes from "./routes/index.js"

const app = express()
app.use(routes)

const PORT = process.env.SERVER_PORT || 8080
app.listen(PORT, function(){
    console.log("Listen to port "+ PORT)
})