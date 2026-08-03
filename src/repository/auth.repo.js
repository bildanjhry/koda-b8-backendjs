import { pool } from "../config/db.js"


export async function createUser(data) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const userRes = await client.query(
      `INSERT INTO "users" ("email", "password") 
      VALUES ($1, $2) RETURNING id, created_at`, [data.email, data.password]
    );

    const user = userRes.rows[0]

    await client.query(
      `INSERT INTO "profile" ("id_user", "fullname", "username") VALUES ($1, $2, $3)`,
      [user.id, data.fullname, "dovesfeather"]
    )

    await client.query(
        `INSERT INTO "user_permissions" ("id_user", "status") VALUES ($1, $2)`,
        [user.id, 1]
    )

    await client.query("COMMIT");
    return user
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    throw err;
  } finally {
    client.release();
  }
}

export async function login(data){
    const res = await pool.query(`SELECT "id", "password" FROM "users" 
        WHERE email = $1`, [data.email])
    return res.rows[0]
}