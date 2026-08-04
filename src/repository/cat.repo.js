import { pool } from "../config/db.js";

export async function addCategory(data){
    const res = await pool.query(`INSERT INTO "categories" 
        ("name") VALUES ($1) RETURNING id`, [data.name])

    return res.rows[0]
}

export async function findAllCat(){
    const res = await pool.query(`SELECT "id", "name", "created_at", "updated_at"
         FROM "categories"`)
    return res.rows
}

export async function findCatDetail(id){
    const res = await pool.query(`SELECT "id", "name", "created_at", "updated_at"
         FROM "categories" WHERE id=$1`, [id])
    return res.rows[0]
}