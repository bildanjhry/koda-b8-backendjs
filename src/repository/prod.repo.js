import { pool } from "../config/db.js";
import slugify from "../libs/slugify.js";

export async function findAllProd(params) {
    const finalPage = (params.page * params.limit) - params.limit
    const res = await pool.query(`SELECT * FROM "products" LIMIT $1 OFFSET $2`,
        [params.limit, finalPage])
    return res.rows
}

export async function findProdBySlugs(slugs) {
    const res = await pool.query(`
        SELECT "products"."id", "products"."title", "products_variants"."price" AS "price",
        "products"."created_at", "products"."updated_at", "products"."slugs",
        "reviews"."rating", "products"."image", "products"."alt",
        json_agg( json_build_object('id', "colors"."id", 'name',"colors"."name", 'hex',"colors"."hex")) AS "avail_colors",
        json_agg( json_build_object('id', "sizes"."id", 'name',"sizes"."name")) AS "avail_sizes",

        json_agg(
        json_build_object(
        'id',"products_variants"."id_product",
        'color',"colors"."name",
        'size',"sizes"."name",
        'rating_total',"reviews"."rating",
        'stock',"products_variants"."stocks",
        'SKU',"products_variants"."sku"
        )) AS "items" 

        FROM "products" 
        JOIN "products_variants" ON "products_variants"."id_product" = "products"."id"
        LEFT JOIN "sizes" ON "sizes"."id" = "products_variants"."id_size"
        LEFT JOIN "colors" ON "colors"."id" = "products_variants"."id_color"
        LEFT JOIN "reviews" ON "reviews"."id_product" = "products"."id"

        WHERE slugs = $1
        
        GROUP BY "products"."id", "products_variants"."price", "products"."title",
        "products"."created_at", "products"."updated_at", "reviews"."rating", "products"."slugs",
        "products"."image", "products"."alt" 
        `, [slugs])

    return res.rows[0]
}

export async function createProduct(data) {
    const client = await pool.connect()
    try {
        await client.query("BEGIN")

        const prodRes = await client.query(`INSERT INTO "products"
        ("title", "price", "description", "image", "alt") VALUES 
        ($1, $2, $3, $4, $5) RETURNING id`, [data.title, data.price, data.description, data.image, data.alt])

        const prod = prodRes.rows[0]
        await client.query(`UPDATE "products" SET slugs = $1 WHERE id = $2`, [slugify(data.title, prod.id), prod.id])

        await client.query("COMMIT")
        return {
            id: prod.id,
        }
    } catch (err) {
        await client.query("ROLLBACK")
        throw new Error(err.message)
    } finally {
        client.release()
    }
}

export async function updateProduct(id, data) {
    const client = await pool.connect()
    try {
        await client.query("BEGIN")
        const queries = []
        const val = []
        let index = 1
        data.slugs = slugify(data.title, id)
        for (const key in data) {
            if (data[key] !== "") {
                queries.push(`${key} = $${index++}`)
                val.push(data[key])
            }
        }

        const prodRes = await client.query(`UPDATE "products"
        SET ${queries}, updated_at = NOW() WHERE id =$${queries.length+1} RETURNING id`, [...val, id])

        const prod = prodRes.rows[0]
        await client.query("COMMIT")
        return {
            id: prod.id,
        }
    } catch (err) {
        await client.query("ROLLBACK")
        throw new Error(err.message)
    } finally {
        client.release()
    }
}