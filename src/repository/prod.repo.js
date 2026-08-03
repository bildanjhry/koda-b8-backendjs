import { pool } from "../config/db.js";

export async function findAllProd(params) {
    const finalPage = (params.page * params.limit) - params.limit
    const res = await pool.query(`SELECT * FROM "products" LIMIT $1 OFFSET $2`,
        [params.limit, finalPage])
    return res.rows
}

export async function findProdBySlugs(slugs) {
    console.log(slugs)
    const res = await pool.query(`SELECT * FROM "products" WHERE slugs = $1`, [slugs])
    return res.rows[0]
}