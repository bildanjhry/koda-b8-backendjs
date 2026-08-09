import { pool } from "../config/db.js";

export async function addDelivery(data) {
    const res = await pool.query(`INSERT INTO "delivery_method" ("name", "desc") VALUES ($1, $2)
        RETURNING id`, [data.name, data.desc])
    return res.rows[0]
}

export async function findAllDeliveries(params) {
    const finalPage = (params.page * params.limit) - params.limit
    const res = await pool.query(`SELECT "id", "name", "desc", "created_at", "updated_at" FROM "delivery_method"
        LIMIT $1 OFFSET $2`,[params.limit, finalPage])
    return res.rows
}