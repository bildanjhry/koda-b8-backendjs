import { pool } from "../config/db.js";

export async function addCategory(data){
    const res = await pool.query(`INSERT INTO "categories" 
        ("name") VALUES ($1) RETURNING id`, [data.cat_name])

    return res.rows[0]
}