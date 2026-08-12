import { pool } from "../config/db.js";

export async function getAllProfile() {
    const res = await pool.query(`SELECT "id_user", "fullname", "username", "phone", "created_at", "updated_at" 
        FROM "profile"`)
    return res.rows
}

export async function getProfileDetail(id) {
    const res = await pool.query(`SELECT "profile"."id_user", "profile"."fullname", "profile"."username", "profile"."phone", "users"."email" AS "email", "profile"."created_at", "profile"."updated_at", 
        "cart"."id" AS "id_cart", "cart"."created_at" AS "cart_created", "cart"."updated_at" AS "cart_updated" 
        FROM "profile" LEFT JOIN "cart" ON "cart"."id_user" = "profile"."id_user" JOIN "users" ON "users"."id" = "profile"."id_user" WHERE users.id = $1`, [id])
    return res.rows[0]
}

export async function updateProfile(id, data){
    const client = await pool.connect()
    try{
        await client.query("BEGIN")
        const queries = []
        const val = []
        let index = 1
        for (const key in data){
            if(data[key] !== "" && key !== "email"){
                queries.push(`${key} = $${index++}`)
                val.push(data[key])
            }
        }
        const userRes = await client.query(`UPDATE "users" SET email = $1, updated_at = NOW() WHERE id = $2 RETURNING id`, [data.email, id])
        if(!userRes.rows[0]){
            throw new Error("Failed update data")
        }
        const res = await client.query(`UPDATE "profile" SET ${queries}, updated_at = NOW() WHERE id_user=$${queries.length+1}`,[...val, id])
        await client.query("COMMIT")
        return res.rowCount

    } catch(err){
        await client.query("ROLLBACK")
        throw new Error(err.message)
    } finally {
        client.release()
    }
}