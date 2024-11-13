const User = require("../models/patients.model");
const Doctor = require("../models/doctors.model");
const Enums = require("../models/enums.model");

const AddNewPatient = async (req, res) => {
  const doctors = await Doctor.findAll();
  const enums = await Enums.findAll();
  const texteditor = `{${req.body.enums}}`;
  const created_date = new Date();
  const userExist=await User.findById(req.body.passport_id)
  const {name,age,passport_id,email,address,phone}=req.body
  const oldInput={name,age,passport_id,email,address,phone}
  if (userExist) {
  return  res.render("../views/users.ejs", {
      title: "User details",
      checker: 'Create',
      doctors,
      enums,
      message:false,
      oldInput
      
    });  
  }
  else{
  try {
    const users = new User(
      req.body.passport_id,
      req.body.name,
      req.body.age,
      texteditor,
      created_date,
      req.body.phone,
      req.body.email,
      req.body.address
    );

    await users.save();
    
  } catch (error) {
    console.log(error);
  }
 return res.redirect("/schedules");
  }
};
const UserPage = async (req, res) => {
  const doctors = await Doctor.findAll();
  const enums = await Enums.findAll();
  res.render("../views/users.ejs", {
    title: "User details",
    checker: true,
    doctors,
    enums,
    message:'',
    oldInput:{}
  });
};
const EditUser = async (req, res) => {
  const doctors = await Doctor.findAll();
  const enums = await Enums.findAll();
  const texteditor = `{${req.body.enums}}`;
  const updated_date = new Date();
  const {name,age,passport_id,email,address,phone}=req.body
  const oldInput={name,age,passport_id,email,address,phone}
  let message
  const userExist = await User.findById(req.body.passport_id);
  if (userExist) {
      await User.editById(
        req.body.passport_id,
        req.body.name,
        req.body.age,
        texteditor,
        updated_date,
        req.body.phone,
        req.body.email,
        req.body.address
      );
      res.redirect("/schedules");
    message=true
  } else {
    message = false
    return  res.render("../views/users.ejs", {
      title: "User details",
      checker: 'Update',
      doctors,
      enums,
      message,
      oldInput
    });
  }
  
};
const DeleteUser = async (req, res) => {
  const doctors = await Doctor.findAll();
  const enums = await Enums.findAll();
  const oldInput=req.body.passport_id
  let message
    try {
      const userExist = await User.findById(req.body.passport_id);
      if (userExist) {
        await User.removeById(req.body.passport_id);
        message=true
      } else {
        message = false
      }
    } catch (error) {
      console.log(error);
    }
  res.render("../views/users.ejs", {
    title: "User details",
    message: message ,
    checker: 'Delete',
    doctors,
    enums,
    oldInput
  });
};
module.exports = {
  AddNewPatient,
  UserPage,
  EditUser,
  DeleteUser,
};
