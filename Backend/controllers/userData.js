const { validationResult } = require("express-validator");
const agent = require("../models/agentModel");
const client = require("../models/clientModel");



const update = async (req, res) => {
    const {  firstName, lastName, email, phone, whatsApp, adresse,dateOfBirth  } = req.body;
    const { id } = req.params;
    try {
       console.log(req.body);
       const user=await client.findById(id)
       if(email !== user.email){
        const exist = await client.findOne({email})
        if (exist ) return res.status(400).json({ error: "User already exist" });
       }
    
        await client.findByIdAndUpdate({ _id:id }, { $set: { firstName, lastName,email, phone, whatsApp, adresse,dateOfBirth } });
        return res.status(200).json({ message: "User data updated" });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };





const getuser=async (req, res) => {
    const { id } = req.params;
    try {
      const user = await client.findById(id).select('-password')
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  const getAllCustomersUsers=async (req, res) => {
    try {
      const users = await client.find();
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

 
  const deleteuser=async(req,res)=>{
    const{id}=req.params
       try {
        await client.findByIdAndDelete({ _id:id });
        
        return res.status(200).json({message: "delete succesfuly"});
       } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
       }
  }
  
exports.deleteuser=deleteuser;
exports.update=update;
exports.getuser=getuser;
exports.getAllCustomersUsers=getAllCustomersUsers;