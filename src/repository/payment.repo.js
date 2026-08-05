import { pool } from "../config/db.js";

export async function addPayment(data) {
    const res = await pool.query(`INSERT INTO "payment_method" ("name") VALUES ($1)
        RETURNING id`, [data.name])
    return res.rows[0]
}

export async function findAllPayment(params) {
    const finalPage = (params.page * params.limit) - params.limit

    const res = await pool.query(`SELECT "id", "name", "created_at", "updated_at" FROM "payment_method"
        LIMIT $1 OFFSET $2`,[params.limit, finalPage])
    return res.rows
}