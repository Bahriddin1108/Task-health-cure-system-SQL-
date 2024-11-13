const pool = require("../config/db");
module.exports = class Doctor {
static async findAll() {
    const users = await pool.query(`SELECT * FROM "Public"."Doctors" ORDER BY id`);
    return users.rows;
}

static async findById(id){
    const user = await pool.query('SELECT * FROM "Public"."Doctors" WHERE id=$1 ', [id])
    return user.rows[0]
}
 }