import { pool } from "../config/db.js";

export async function getAllProfile() {
    const res = await pool.query(`SELECT "id_user", "fullname", "username", "phone", "address_ID", "created_at", "updated_at" 
        FROM "profile"`)
    return res.rows
}

export async function getProfileDetail(id) {
    const res = await pool.query(`SELECT "profile"."id_user", "profile"."fullname", "profile"."username", "profile"."phone", "profile"."address_ID", "profile"."created_at", "profile"."updated_at", 
        "cart"."id" AS "id_cart" ,"cart"."products_ID", "cart"."created_at" AS "cart_created", "cart"."updated_at" AS "cart_updated" 
        FROM "profile" LEFT JOIN "cart" ON "cart"."id_user" = "profile"."id_user" WHERE profile.id_user = $1`, [id])
    return res.rows[0]
}