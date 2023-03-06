const client = require("../models/clientModel");
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const { body, validationResult } = require('express-validator');
const agent = require("../models/agentModel");
const sendEmail = require("../utils/sendEmail");
const admin = require("../models/adminModel");


//register route
const signup = async (req, res) => {
  console.log('body',req.body)
  const { role,firstName, lastName, email, phone, password } = req.body;
  

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ errors: errors.array() });
    }
    
    // check if the user exists
    const exist = role ==="1" ? await client.findOne({ email: req.body.email }):await agent.findOne({ email: req.body.email });
    if (exist) {
      return res.status(400).json({ error: "User already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = {  firstName,
      lastName,
      email,
      phone,
      password: hashPassword,
      role}
    if(role=='1'){
    await client.create(user);}
    else
    await agent.create(user);
    
    return res.status(201).json({ message: "user create" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

//login route
const login = async (req, res) => {
  console.log(req.body);
  try {
    // check if the user exists
    
    const user = req.body.role ==="1" ? await client.findOne({ email: req.body.email }):await agent.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(400).json({ error: "user not register yet" });
    }
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      // sign token and send it in response
      const token = await jwt.sign({ username: user.email }, process.env.SECRET);
      res.json({ token, user:user._id });

    } else {
      res.status(400).json({ error: "Email or Password are false" });
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({ error: e });
  }
};


const recoverPassword = async(req,res) => {
  console.log(req.body)
  const {email,role} = req.body
  try {
    const user =role ==="1" ? await client.findOne({email }):await agent.findOne({email});
    if(!user)
    return res.status(400).json({error:'email is not exist'})

    const subject = "recover password"
    const newPassword= Math.random().toString(36).slice(-8);
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password=hashPassword;
    await user.save();
    await sendEmail(email,subject,newPassword);
    return res.status(200).json({message:'sent succus'})
  } catch (e) {
    res.status(400).json({ error: e });
  }
}

const AdminLog = async (req, res) => {
 
  try {

    const user = await admin.findOne()
    
    
    if (req.body.password===user.password) {
      // sign token and send it in response
      console.log(user)
      const token = await jwt.sign({ username: user.email }, process.env.SECRET);
      res.json({ token });
    } else {
      res.status(400).json({ error: "Password is false" });
    }
    
  } catch (e) {
    console.log(e)
    res.status(400).json({ error: e });
  }
};
exports.recoverPassword=recoverPassword;
exports.login = login;
exports.signup = signup;
exports.AdminLog = AdminLog;