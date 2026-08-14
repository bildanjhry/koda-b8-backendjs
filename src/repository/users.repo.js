import { pool } from "../config/db.js";

export async function findUsersCheckoutHis(params) {
    const finnalPage = (params.page * params.limit) - params.limit
    const res = await pool.query(`SELECT
    "profile"."id_user",
    "profile"."fullname",
    "profile"."phone",
    "users"."email",

    json_agg(
        json_build_object(
            'id_order', "orders"."id",
            'fullname',"profile"."fullname",
            'phone',"profile"."phone",
            'email',"users"."email",
            'id_checkout', "checkout_histories"."id",
            'id_payment', "payment_method"."name",
            'id_delivery', "delivery_method"."name",
            'id_order_status', "order_status"."id",
            'order_status', "order_status"."name",
            'total', "orders"."total",  
            'products',
            products.products
        )
    ) AS "checkout_histories"

    FROM "profile"
    
    JOIN "users" ON "users"."id" = "profile"."id_user"
    JOIN "orders" ON "orders"."id_user" = "profile"."id_user"
    LEFT JOIN "checkout_histories" ON "checkout_histories"."id_order" = "orders"."id"
    JOIN (
        SELECT "order_items"."id_order",
        json_agg(
            json_build_object(
                'id', "products_variants"."id",
                'id_color', "products_variants"."id_color"
            )
    ) AS products
    FROM "order_items"
    JOIN "products_variants" ON "products_variants"."id" = "order_items"."id_product"
    GROUP BY "order_items"."id_order"
    ) AS products ON products.id_order = orders.id

    JOIN "payment_method" ON "payment_method"."id" = "checkout_histories"."id_payment_method"
    JOIN "delivery_method" ON "delivery_method"."id" = "checkout_histories"."id_delivery_method"
    LEFT JOIN "order_status" ON "order_status"."id" = "checkout_histories"."id_order_status"

    GROUP BY "profile"."id_user", "profile"."fullname", "profile"."phone", "users"."email" LIMIT $1 OFFSET $2`, [params.limit, finnalPage])

    return res.rows
}

export async function findUsersCheckoutHisByid(id_user) {
    const res = await pool.query(`SELECT
    "profile"."id_user",
    "profile"."fullname",
    "profile"."phone",
    
    json_agg(
        json_build_object(
            'id_order', "orders"."id",
            'id_checkout', "checkout_histories"."id",
            'subtotal', "orders"."subtotal",
            'total', "orders"."total",
            'payment_method', "payment_method"."name",
            'delivery_method', "delivery_method"."name",
            'id_order_status', "order_status"."id",
            'order_status', "order_status"."name",
            'products',
            products.products
        )
    ) AS "checkout_histories"

    FROM "profile"

    JOIN "orders" ON "orders"."id_user" = "profile"."id_user"
    LEFT JOIN "checkout_histories" ON "checkout_histories"."id_order" = "orders"."id"
    JOIN (
        SELECT "order_items"."id_order",
        json_agg(
            json_build_object(
                'id', "products_variants"."id",
                'quantity',"order_items"."quantity",
                'price',"products_variants"."price",
                'color', "colors"."name",
                'name', "products"."title",
                'image', "products"."image",
                'alt', "products"."alt"
            )
    ) AS products
    FROM "order_items"
    JOIN "products_variants" ON "products_variants"."id" = "order_items"."id_product"
    JOIN "colors" ON "colors"."id" = "products_variants"."id_color"
    JOIN "products" ON "products"."id" = "products_variants"."id_product"
    GROUP BY "order_items"."id_order"
    ) AS products ON products.id_order = orders.id

    JOIN "payment_method" ON "payment_method"."id" = "checkout_histories"."id_payment_method"
    JOIN "delivery_method" ON "delivery_method"."id" = "checkout_histories"."id_delivery_method"
    LEFT JOIN "order_status" ON "order_status"."id" = "checkout_histories"."id_order_status"

    WHERE "profile"."id_user" = $1

    GROUP BY "profile"."id_user", "profile"."fullname", "profile"."phone" `, [id_user])

    return res.rows
}


export async function findAllUsers(params) {
    const finnalPage = (params.page * params.limit) - params.limit
    const res = pool.query(`SELECT "id", "email", "created_at", "updated_at" from "users" LIMIT $1 OFFSET $2`,
        [params.limit, finnalPage])
    return (await res).rows
}