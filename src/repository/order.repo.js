import { pool } from "../config/db.js";

export async function createOrder(id_user, data) {
    const client = await pool.connect()
    try {
        const res = await client.query(`INSERT INTO "orders" ("id_user") 
            VALUES ($1) RETURNING id, subtotal`, [id_user])

        const order = res.rows[0]
        const items = await client.query(`INSERT INTO "order_items" ("id_order", "id_product", "quantity", "price")
            VALUES ($1, $2, $3, $4) RETURNING quantity, price`,[order.id, data.id_product, data.quantity, data.price] )
        
        const itemsRes = items.rows[0]
        let start = itemsRes.subtotal || 0
        const subtotal = start + (parseInt(itemsRes.quantity) * parseInt(itemsRes.price))

        await client.query(`UPDATE "orders" SET subtotal=$1, total=$2, status_checkout=$3 
            WHERE id=$4`, 
            [subtotal, subtotal, 1, order.id])

        await client.query(`INSERT INTO "checkout_histories" ("id_user", "id_product", "payment_method", "order_status")
            VALUES ($1, $2, $3, $4)`, [id_user, data.id_product, "BCA Virtual Account", 1])

        return {
            id: order.id
        }
    } catch (err) {
        await client.query("ROLLBACK")
        throw new Error(err.message)
    } finally {
        client.release()
    }
}

export async function findAllOrders() {
    const res = await pool.query(`SELECT * FROM "orders"`)
    return res.rows
}