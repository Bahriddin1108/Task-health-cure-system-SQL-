const Doctor = require('../models/doctors.model')

const homePage = async (req, res) => {
   const doctors=await Doctor.findAll()
  res.render('../views/home.ejs',{
    title:'Heathcare Patient Management System',
    checker:true,
    doctors,
    
  });
}
module.exports={
       homePage,
}
