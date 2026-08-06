import { pool } from "../config/db.js";

export async function findAddresByUser(id_user){
    const res = await pool.query(`SELECT * FROM "address" WHERE id = $1`,[id_user])
    return res.rows[0]
}