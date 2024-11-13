const {Router}=require('express')
const router=Router()

const { homePage } = require('../controllers/home.controllers')



router.get('/',homePage)










module.exports=router