const Appointment = require("../models/appointment.model")
const Doctor = require("../models/doctors.model")
const Enums = require("../models/enums.model")
const User = require("../models/patients.model")
const Schedules = require("../models/schedules.model")

const appointment=async(req,res)=>{
  const doctors=await Doctor.findAll()
  const enums=await Enums.findAll()
 
    res.render('../views/appointment.ejs',{
        title:'Make an Appointment',
        checker:false,
        check:'',
        doctors,
        enums,
        message:false,
        id:'',
        oldInput:''
      
    })
  }





const makeAppointment=async(req,res)=>{
    const doctors=await Doctor.findAll()
    const enums=await Enums.findAll()
    const created_date = new Date();
    const schedules=await Schedules.findByDate('2024-11-13','2024-11-15')
    console.log(schedules)
   
    const users= await User.findAll()
    const { nanoid } = await import('nanoid');
    const id=nanoid(12)
    const status='Rejalashtirilgan'
    const name=req.body.name
    const number=req.body.passport_id
    const nameChecker=users.some(user=>user.p_name===name)
    const Idchecker=users.some(user=>user.passport_id===number)
    let message
    if (nameChecker&&Idchecker) {
      const appointments= new Appointment(
        id,
        req.body.name,
        req.body.passport_id,
        req.body.date,
        req.body.enums,
        req.body.doctors,
        status,
        created_date
        )
       const user = users.find(user => user.passport_id === req.body.passport_id);      
       const enumChecker=user.medical_history
       const check=enumChecker.some(user=>user===req.body.enums)
           if(!check){
        user.medical_history.push(req.body.enums)
        await User.patch('medical_history',req.body.passport_id,user.medical_history)  
      
      }
      await appointments.save()
      
      message=true
    }
    else{
      message=false
    
    }
    return  res.render("../views/appointment.ejs", {
      title: "Make an Appointment",
      checker:false,
      check: 'Appointment',
      doctors,
      enums,
      message,
      oldInput:'',
      id
      
    });  
  }

  const editAppointment=async(req,res)=>{
    const doctorss=await Doctor.findAll()
    const enumss=await Enums.findAll()
    const app=await Appointment.findAll() 
    const updated_date=new Date()

    let message
    const {id}=req.body
    let oldInput={id}
    const check=app.some(user=>((user.id===req.body.id)&&(user.status==='Rejalashtirilgan')))
    if(check){
      await Appointment.editById(
        req.body.id,
        req.body.date,
        req.body.enums,
        req.body.doctors,
        updated_date
      )
      message=true
      oldInput=''
    }
    else{
      message=false
    }
    
      res.render('../views/appointment.ejs',{
          title:'Make an Appointment',
          checker:false,
          check:'Update',
          doctors:doctorss,
          enums:enumss,
          message,
          id:'',
          oldInput
        
      })
    }

    const cancelAppointment = async (req, res) => {
      const app=await Appointment.findAll()
      const doctors= await Doctor.findAll();
      const enums = await Enums.findAll();
      const oldInput=req.body
      
      let message
      const check=app.some(user=>user.id===req.body.id)
          if (check) {
            await Appointment.patch('status',req.body.id,'Bekor qilingan')
            message=true

          } else {
            message = false
          }
       
      res.render("../views/appointment.ejs", {
        title: "User details",
        message,
        check:'Delete',
        checker: false,
        doctors,
        enums,
        oldInput
      });
    }
  


  module.exports={
    appointment,
    
    makeAppointment,
    editAppointment,
    cancelAppointment,
   
  }