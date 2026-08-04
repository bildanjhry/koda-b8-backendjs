import { pool } from "../config/db.js";

export async function addColor(data){
    const res = await pool.query(`INSERT INTO "colors" 
        ("name", "hex") VALUES ($1, $2) RETURNING id`, [data.name, data.hex])
    return res.rows[0]
}

export async function findAllColors(){
    const res = await pool.query(`SELECT "id", "name", "hex", "created_at", "updated_at"
         FROM "colors"`)
    return res.rows
}

export async function findColorDetail(id){
    const res = await pool.query(`SELECT "id", "name", "hex", "created_at", "updated_at"
         FROM "colors" WHERE id=$1`, [id])
    return res.rows[0]
}
