import { pool } from "../config/db.js";
import slugify from "../libs/slugify.js";

export async function findAllProdVar(params) {
    const finalPage = (params.page * params.limit) - params.limit
    const res = await pool.query(`SELECT * FROM "products_variants" LIMIT $1 OFFSET $2`,
        [params.limit, finalPage])
    return res.rows
}

export async function findProdVarById(id) {
    const res = await pool.query(`SELECT * FROM "products_variants" WHERE id = $1`, [id])
    return res.rows[0]
}

export async function createProductVar(data) {
    const client = await pool.connect()
    try {
        await client.query("BEGIN")

        const prodRes = await client.query(`INSERT INTO "products_variants"
        ("id_product", "id_color", "id_size", "stocks", "price", "sku") VALUES 
        ($1, $2, $3, $4, $5, $6) RETURNING id`, [data.id_product, data.id_color, data.id_size, data.stocks, data.price, data.sku])

        const prod = prodRes.rows[0]
        await client.query("COMMIT")
        return {
            id: prod.id,
        }
    } catch (err) {
        await client.query("ROLLBACK")
        throw new Error(err.message)
    } finally {
        client.release()
    }
}
