const pool = require("../config/db");
module.exports = class Appointment {
    constructor(id,name,passport_id,date,enums,doctors,status,created_date){
        this.id=id   
        this.name=name
        this.passport_id=passport_id
        this.date=date
        this.enums=enums
        this.doctors=doctors
        this.status=status
        this.created_date=created_date
    }

async save() { 
    const newUser = await pool.query(
      `INSERT INTO "Public"."Appointments" (id,passport_id,name,date,enums,doctors,status,created_date) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [this.id, this.passport_id, this.name, this.date, this.enums,
       this.doctors, this.status, this.created_date]);
    return newUser.rows   
}
static async findAll() {
    const users = await pool.query(`SELECT * FROM "Public"."Appointments" ORDER BY passport_id`);
return users.rows;
}
static async editById(id,date,enums,doctors,updated_date){
    await pool.query(`UPDATE "Public"."Appointments" SET date=$1, enums=$2, doctors=$3, updated_date=$4 WHERE id=$5`, 
        [date,enums,doctors,updated_date,id]);
}
static async patch(changer,id,value){
    await pool.query(`UPDATE "Public"."Appointments" SET ${changer}=$1 WHERE id=$2`, 
        [value,id]);
}

static async removeById(id){
    await pool.query('DELETE FROM "Public"."Appointments" WHERE id=$1',[id])
      
}




}
