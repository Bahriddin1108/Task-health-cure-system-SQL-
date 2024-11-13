const moment=require('moment')
const Schedules = require("../models/schedules.model")
const Enums = require('../models/enums.model')
const Doctors = require('../models/doctors.model')
const schedules=async(req,res)=>{
    const enums= await Enums.findAll()
    const doctors= await Doctors.findAll()
   
      res.render('../views/schedules.ejs',{
          title:'Schedules',
          checker:true,
          enums,
          doctors,
          schedules:''
      })
      
    }

    const findByDate = async (req, res) => {
        const enums= await Enums.findAll()
        const doctors= await Doctors.findAll()
        try {
            const date1 = moment(req.body.date1).format('YYYY-MM-DD HH:mm:ss');
            const date2 = moment(req.body.date2).format('YYYY-MM-DD HH:mm:ss');
    
    
            const schedules = await Schedules.findByDate(date1, date2);
            res.render('../views/schedules.ejs',{
                title:'Schedules',
                checker:'1',
                enums,
                doctors,
                schedules
            })
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    const findByEnum = async (req, res) => {
        const enums= await Enums.findAll()
        const doctors= await Doctors.findAll()
        const schedules=await Schedules.findByEnum(req.body.enums)
        res.render('../views/schedules.ejs',{
            title:'Schedules',
            checker:'1',
            enums,
            doctors,
            schedules
        })
    };
    
    const findByDoctor = async (req, res) => {
        const enums= await Enums.findAll()
        const doctors= await Doctors.findAll()
        const schedules=await Schedules.findByDoctor(req.body.doctors)
        schedules.forEach(user=>user.date=moment(user.date).format('DD-MM-YYYY HH:mm'))
        res.render('../views/schedules.ejs',{
            title:'Schedules',
            checker:'2',
            enums,
            doctors,
            schedules
        })
    };

    const searchPatient = async (req, res) => {
        const enums= await Enums.findAll()
        const doctors= await Doctors.findAll()
        const date1 = moment(req.body.date4).format('YYYY-MM-DD HH:mm:ss');
        const date2 = moment(req.body.date5).format('YYYY-MM-DD HH:mm:ss');
        
        const schedules=await Schedules.search(date1,date2)
        res.render('../views/schedules.ejs',{
            title:'Schedules',
            checker:'1',
            enums,
            doctors,
            schedules
        })
    };
    

 
module.exports={
    schedules,
    findByDate,
    findByEnum,
    findByDoctor,
    searchPatient

} 
