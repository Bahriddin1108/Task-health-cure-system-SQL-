const pool = require("../config/db");
module.exports = class Enums {
static async findAll() {
    const users = await pool.query(`SELECT * FROM "Public"."Enums" ORDER BY id`);
    return users.rows;
}

static async findById(id){
    const user = await pool.query('SELECT * FROM "Public"."Enums" WHERE id=$1 ', [id])
    return user.rows[0]
}
 }