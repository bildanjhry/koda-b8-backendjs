import { pool } from "../config/db.js";

export async function addSize(data){
    const res = await pool.query(`INSERT INTO "sizes" 
        ("name") VALUES ($1) RETURNING id`, [data.name])
    return res.rows[0]
}

export async function findAllSizes(){
    const res = await pool.query(`SELECT "id", "name", "created_at", "updated_at"
         FROM "sizes"`)
    return res.rows
}

export async function findSizesDetail(id){
    const res = await pool.query(`SELECT "id", "name", "created_at", "updated_at"
         FROM "sizes" WHERE id=$1`, [id])
    return res.rows[0]
}
