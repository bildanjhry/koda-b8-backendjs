import { pool } from "../config/db.js";

export async function findAddresByUser(id_user){
    const res = await pool.query(`SELECT * FROM "address" WHERE id_user = $1 ORDER BY created_at DESC`,[id_user])
    return res.rows
}

export async function createUserAddress(id_user, data){
    const res = await pool.query(`INSERT INTO "address" 
        ("id_user", "fulladdress", "province", "city", "postcode", "optional")
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, [id_user, 
            data.fulladdress, data.province, data.city, data.postcode, data.optional])
    return res.rows[0]
}   