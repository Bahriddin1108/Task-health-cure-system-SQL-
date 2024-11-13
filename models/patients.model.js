const pool = require("../config/db");
module.exports = class User {
    constructor(passport_id,name, age,enums,created_date,phone,email,address){
        this.passport_id=passport_id
        this.name=name
        this.age=age
        this.enums=enums
        this.created_date=created_date
        this.phone=phone
        this.email=email
        this.address=address
    } 
async save() { 
    const newUser = await pool.query(
      `INSERT INTO "Public"."Patients" (
      passport_id,
      p_name,
      age,
      medical_history,
      created_date,
      contact_info
      )   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [this.passport_id,
       this.name, 
       this.age,
       this.enums,
       this.created_date,
       JSON.stringify({telefon:this.phone,email:this.email,address:this.address})
    ]
    );
    return newUser.rows   
}
static async findAll() {
    const users = await pool.query(`SELECT * FROM "Public"."Patients" ORDER BY passport_id`);
return users.rows;
}
static async findById(passport_id){
    const user = await pool.query('SELECT * FROM "Public"."Patients" WHERE passport_id=$1 ', [passport_id])
    return user.rows[0]
}
static async editById(passport_id,name,age,medical_history,updated_date,phone,email,address){
    await pool.query(`UPDATE "Public"."Patients" SET p_name=$1, age=$2, medical_history=$3,updated_date=$4, contact_info=$5 WHERE passport_id=$6`, 
        [name,age,medical_history,updated_date,JSON.stringify({telefon:phone,email:email,address:address}),passport_id]);
}
static async patch(changer,passport_id,value){
    await pool.query(`UPDATE "Public"."Patients" SET ${changer}=$1 WHERE passport_id=$2`, 
        [value,passport_id]);
}
static async removeById(passport_id){
    await pool.query('DELETE FROM "Public"."Patients" WHERE passport_id=$1',[passport_id])
      
} }