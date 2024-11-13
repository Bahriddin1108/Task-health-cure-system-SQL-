const express=require('express')
const router=express.Router()
const { makeAppointment, appointment, editAppointment, cancelAppointment } = require('../controllers/appointment')

router.post('/appointment',makeAppointment)
router.get('/appointment',appointment)

router.post('/editApp',editAppointment)
router.post('/cancelApp',cancelAppointment)





module.exports=router