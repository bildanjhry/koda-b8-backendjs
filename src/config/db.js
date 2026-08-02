import pg from "pg";
import dotenv from "dotenv"
 
dotenv.config()
const { Pool } = pg

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

export async function connectDB(){
    try{
        console.log("Connected to Dababase")
    } catch(err){
        console.error(err.message)
    }
}