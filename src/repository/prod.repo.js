import { pool } from "../config/db.js";
import slugify from "../libs/slugify.js";

export async function findAllProd(params) {
    const finalPage = (params.page * params.limit) - params.limit
    const res = await pool.query(`SELECT * FROM "products" LIMIT $1 OFFSET $2`,
        [params.limit, finalPage])
    return res.rows
}

export async function findProdBySlugs(slugs) {
    const res = await pool.query(`SELECT * FROM "products" WHERE slugs = $1`, [slugs])
    return res.rows[0]
}

export async function createProduct(data) {
    const client = await pool.connect()
    try{
        await client.query("BEGIN")
        
        const prodRes = await client.query(`INSERT INTO "products"
        ("title", "price", "description", "image", "alt") VALUES 
        ($1, $2, $3, $4, $5) RETURNING id`, [data.title, data.price, data.description, data.image, data.alt])
        
        const prod = prodRes.rows[0]
        await client.query(`UPDATE "products" SET slugs = $1 WHERE id = $2`, [slugify(data.title, prod.id), prod.id])

        await client.query("COMMIT")
        return {
            id:prod.id,
        }
    } catch(err){
        await client.query("ROLLBACK")
        throw new Error(err.message)
    } finally {
        client.release
    }
}