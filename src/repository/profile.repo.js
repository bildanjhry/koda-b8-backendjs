import { pool } from "../config/db.js";

export async function getAllProfile(){
    const res = await pool.query(`SELECT "id_user", "fullname", "username", "phone", "address_ID" 
        FROM "profile"`)
    return res.rows
}