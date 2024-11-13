const express = require('express');
const router = express.Router();
const { schedules, findByDate, findByEnum, findByDoctor, searchPatient } = require('../controllers/schedules.controllers.js')





router.post('/schedules',schedules)
router.get('/schedules',schedules)

router.post('/search',findByDate)
router.post('/find',findByEnum)
router.post('/view',findByDoctor)
router.post('/show',searchPatient)




module.exports=router