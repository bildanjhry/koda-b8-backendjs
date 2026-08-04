import { pool } from "../config/db.js"

export async function findAllCart(params) {
    const finalPage = (params.page * params.limit) - params.limit
    const res = await pool.query(`SELECT * FROM "cart" LIMIT $1 OFFSET $2`,
        [params.limit, finalPage])
    return res.rows

}

export async function findCartDetail(id) {
    const res = await pool.query(`SELECT * FROM "cart" WHERE id = $1`,
        [id])
    return res.rows[0]
}