import { pool } from "../config/db.js";

export async function getAllProfile() {
    const res = await pool.query(`SELECT "id_user", "fullname", "username", "phone", "created_at", "updated_at" 
        FROM "profile"`)
    return res.rows
}

export async function getProfileDetail(id) {
    const res = await pool.query(`SELECT "profile"."id_user", "profile"."fullname", "profile"."username", "profile"."phone", "users"."email" AS "email", "profile"."address_ID", "profile"."created_at", "profile"."updated_at", 
        "cart"."id" AS "id_cart" , "cart"."created_at" AS "cart_created", "cart"."updated_at" AS "cart_updated" 
        FROM "profile" LEFT JOIN "cart" ON "cart"."id_user" = "profile"."id_user" JOIN "users" ON "users"."id" = "profile"."id_user" WHERE users.id = $1`, [id])
    return res.rows[0]
}

export async function updateProfile(id, data){
    const queries = []
    const val = []
    let index = 1
    for (const key in data){
        if(data[key] !== ""){
            queries.push(`${key} = $${index++}`)
            val.push(data[key])
        }
    }

    const res = await pool.query(`UPDATE "profile" SET ${queries}, updated_at = NOW() WHERE id_user=$${queries.length+1}`,[...val, id])
    
    return res.rowCount
}