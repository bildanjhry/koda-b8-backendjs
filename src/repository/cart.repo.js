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
        await client.query("BEGIN")
        let cart
        const userCart = await getCartByUser(id_user)
        if (!userCart) {
            const res = await client.query(`INSERT INTO "cart" ("id_user") 
            VALUES ($1) RETURNING id`, [id_user])
            cart = res.rows[0]
        } else {
            cart = userCart
        }

        const item = await client.query(`INSERT INTO "cart_items" ("id_cart", "id_product", "quantity") 
            VALUES ($1, $2, $3) RETURNING id`,
            [cart.id, data.id_product, data.quantity])
        await client.query("COMMIT")
        const dataCart = await getCartByUser(id_user)
        const dataReturn = dataCart?.order_items.filter((item) => item.id === parseInt(data.id_product))
        return dataReturn

    } catch (err) {
        await client.query("ROLLBACK")
        throw new Error(err.message)
    } finally {
        client.release()
    }
}

export async function getCartItemById(id_cart) {
    const res = await pool.query(`SELECT * FROM "cart_items" WHERE id_cart = $1`, [id_cart])
    return res.rows[0]
}

export async function getCartByUser(id_user) {
    const res = await pool.query(
        `SELECT 
        "cart"."id", "cart"."id_user", 
        SUM("products_variants"."price") AS "subtotal",
        SUM("products_variants"."price") AS "total",

        json_agg( 
        json_build_object(
        'id',"cart_items"."id", 
        'name',"products"."title",
        'id_var',"products_variants"."id",
        'id_cart',"cart"."id",
        'price',"products_variants"."price",
        'size', "sizes"."name",
        'image',"products"."image",
        'color',"colors"."name", 
        'quantity_prod',"cart_items"."quantity")) AS "order_items" 

        FROM "cart" JOIN "cart_items" 
        ON "cart_items"."id_cart" = "cart"."id"
        JOIN "products_variants" 
        ON "products_variants"."id" = "cart_items"."id_product"
        JOIN "colors" ON "colors"."id" = "products_variants"."id_color"
        JOIN "sizes" ON "sizes"."id" = "products_variants"."id_size" 
        JOIN "products" ON "products"."id" = "products_variants"."id_product"
        
        WHERE "cart"."id_user" = $1 
        
        GROUP BY "cart"."id", "cart"."id_user"`, [id_user])
    return res.rows[0]
}