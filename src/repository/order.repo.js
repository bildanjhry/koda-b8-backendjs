import { pool } from "../config/db.js";

export async function createOrder(id_user, data) {
    const client = await pool.connect()
    try {
        await client.query("BEGIN");
        const res = await client.query(`INSERT INTO "orders" ("id_user") 
            VALUES ($1) RETURNING id, subtotal`, [id_user])

        const order = res.rows[0]

        const values = [];
        const params = [];

        data.items.forEach((item, i) => {
            const index = i * 3;
            values.push(`($${index + 1}, $${index + 2}, $${index + 3})`);
            params.push(parseInt(order.id), item.id_product, item.quantity);
        });

        const items = await client.query(`INSERT INTO "order_items" ("id_order", "id_product", "quantity")
            VALUES ${values.join(", ")} RETURNING quantity`, params)

        const prod = await client.query(`
        SELECT
            "products_variants"."sku",
            "order_items"."quantity",
            "products_variants"."price"
        FROM "order_items"
        JOIN "products_variants"
            ON "products_variants"."id" = "order_items"."id_product"
        WHERE "order_items"."id_order" = $1 
        `, [order.id]);

        console.log(prod.rows[0])

        const itemsRes = prod.rows[0]
        let start = itemsRes.subtotal || 0
        const subtotal = start + (itemsRes.quantity * parseInt(itemsRes.price))

        await client.query(`UPDATE "orders" SET subtotal=$1, total=$2, status_checkout=$3 
            WHERE id=$4`,
            [subtotal, subtotal, 1, parseInt(order.id)])

        await client.query(`INSERT INTO "checkout_histories" 
            ("id_user", "id_order", "id_payment_method", "id_delivery_method")
            VALUES ($1, $2, $3, $4)`, [id_user, parseInt(order.id), data.id_payment_method, data.id_delivery_method])

        await client.query("COMMIT")
        return {
            id: order.id
        }
    } catch (err) {
        await client.query("ROLLBACK")
        console.error(err)
        throw new Error(err.message)
    } finally {
        client.release()
    }
}

export async function findAllOrders() {
    const res = await pool.query(`SELECT * FROM "orders"`)
    return res.rows
}