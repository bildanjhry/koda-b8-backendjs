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

export async function createCart(id_user, data) {
    const client = await pool.connect()
    try {
        const res = await client.query(`INSERT INTO "cart" ("id_user") 
        VALUES ($1) RETURNING id`, [id_user])

        const cart = res.rows[0]
        await client.query(`INSERT INTO "cart_items" ("id_cart", "id_product", "quantity") 
            VALUES ($1, $2, $3)`, 
            [cart.id, data.id_product, data.quantity])
        await client.query("COMMIT")
        return {
            id: cart.id
        }

    } catch (err) {
        await client.query("ROLLBACK")
        throw new Error(err.message)
    } finally {
        client.release()
    }
}