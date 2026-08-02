import { pool } from "../config/db"

export async function createUser(data) {
    const res = await pool.query(`INSERST INTO "users" ("email", "password") 
        VALUES ($1, $2)` [data.email, data.password])
}

export async function login(data){
    const res = await pool.query(`SELECT "id", "password" FROM "users" 
        WHERE email = $1`, [data.email])
    return res.rows[0]
}