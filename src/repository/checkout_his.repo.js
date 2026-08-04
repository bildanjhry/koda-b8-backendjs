import { pool } from "../config/db.js";

export async function findAllCheckoutHis() {
    const res = await pool.query(`SELECT * FROM "checkout_histories"`)
    return res.rows
}