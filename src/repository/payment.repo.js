import { pool } from "../config/db.js";

export async function addPayment(data) {
    const res = await pool.query(`INSERT INTO "payment_method" ("name") VALUES ($1)
        RETURNING id`, [data.payment])
    return res.rows[0]
}