import { pool } from "../config/db.js";

export async function findUsersCheckoutHis(params) {
    const finnalPage = (params.page * params.limit) - params.limit
    const res = await pool.query(`SELECT "profile"."id_user", "profile"."fullname", "profile"."phone", 
        json_build_object('id_order',"orders"."id", 'id_checkout', "checkout_histories"."id", 'id_payment', "checkout_histories"."id_payment_method",
        'id_delivery',"checkout_histories"."id_delivery_method", 'order_status',"checkout_histories"."order_status", 'products', 
        json_agg( json_build_object('id',"products_variants"."id", 'id_color',"products_variants"."id_color")) ) AS "checkout_histories"
        FROM "profile" JOIN "orders" ON "orders"."id_user" = "profile"."id_user"
        JOIN "checkout_histories" ON 
        "checkout_histories"."id_user" = "profile"."id_user" JOIN "products_variants" ON 
        "products_variants"."id" = "checkout_histories"."id_product" 
        GROUP BY "profile"."id_user", "profile"."fullname", "profile"."phone", 
        "checkout_histories"."id", "orders"."id"`)

    return res.rows
}

export async function findAllUsers(params) {
    const finnalPage = (params.page * params.limit) - params.limit
    const res = pool.query(`SELECT "id", "email", "created_at", "updated_at" from "users" LIMIT $1 OFFSET $2`,
        [params.limit, finnalPage])
    return (await res).rows
}