const {Router}=require('express')
const router=Router()
const { UserPage, EditUser, DeleteUser, AddNewPatient } = require('../controllers/patients.controllers')

router.get('/UserPage', UserPage)
router.post('/editUserPage',EditUser)
router.post('/delete',DeleteUser)
router.post('/add',AddNewPatient)

exports.router=router 
