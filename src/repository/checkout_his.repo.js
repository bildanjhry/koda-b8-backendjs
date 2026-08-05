import { pool } from "../config/db.js";

export async function findAllCheckoutHis() {
    const res = await pool.query(`SELECT * FROM "checkout_histories"`)
    return res.rows
}

export async function findCheckoutHisById(id) {
    const res = await pool.query(`SELECT * FROM "checkout_histories" WHERE id=$1`, [id])
    return res.rows[0]
}