const pool = require("../config/db");
module.exports = class Schedules {
    
static async findByDate(date1, date2) {
        try {   
            
        const users = await pool.query(`SELECT distinct on(name) name, date, enums, doctors
             FROM "Public"."Appointments" WHERE date BETWEEN $1 AND $2 AND status='Rejalashtirilgan';`, [date1, date2]);
            return users.rows;
        } catch (err) {
            console.error('Database Error:', err);
            throw err;
        }
}   

static async findByEnum(enums) {
    try {   
        
    const users = await pool.query(`SELECT * FROM "Public"."Patients" WHERE $1=ANY(medical_history);`, [enums]);
        
        return users.rows;
    } catch (err) {
        console.error('Database Error:', err);
        throw err;
    }
}

static async findByDoctor(doctors) {
    try {   
        
    const users = await pool.query(`SELECT name,date,enums,doctors FROM "Public"."Appointments" WHERE doctors=$1;`, [doctors]);
      
        return users.rows;
    } catch (err) {
        console.error('Database Error:', err);
        throw err;
    }
}

static async search(date1,date2) {
    try {   
        
    const users = await pool.query(`SELECT distinct name FROM "Public"."Appointments" WHERE NOT date BETWEEN $1 AND $2;`, [date1,date2]);
    return users.rows
        
    } catch (err) {
        console.error('Database Error:', err);
        throw err;
    }
}

}
