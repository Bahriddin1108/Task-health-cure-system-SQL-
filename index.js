const express=require('express')
const path=require('path')
const app=express()
 

app.set("view engine", "ejs");
app.set('views','views')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'Medical')))


app.use(require('./routes/appointment.route'))
app.use(require('./routes/home.route'))
app.use(require('./routes/patients.route').router)
app.use(require('./routes/schedule.route'))





const PORT=process.env.PORT||4000

app.listen(PORT,()=>{
    console.log('work')
})