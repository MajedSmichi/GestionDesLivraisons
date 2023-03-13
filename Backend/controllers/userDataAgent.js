const agent = require("../models/agentModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");




//get user
const getAgent = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await agent.findById(id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


  //get All Agents
const getAllAgent= async (req, res) => {
    try {
      const users = await agent.find();
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };



  //add Agent in admin dashboard

  const addAgent = async (req, res) => {
    const { firstName, lastName, email, phone, password, whatsApp, adresse } =
      req.body;
    role = "2";
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
      }
      const exist = await agent.findOne({ email: req.body.email });
      if (exist) {
        return res.status(400).json({ error: "User already exist" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const user = {
        firstName,
        lastName,
        email,
        phone,
        password: hashPassword,
        whatsApp,
        adresse,
        role,
      };
      await agent.create(user);
      return res.status(201).json({ message: "user create" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e });
    }
  };

  //update Agent

  const updateAgent = async (req, res) => {
    const { firstName, lastName, email, phone, whatsApp, adresse, dateOfBirth,vehicule,idCard } =
      req.body;
    const { id } = req.params;
    try {
      console.log(req.body);
      const user = await agent.findById(id);
      if (email !== user.email) {
        const exist = await agent.findOne({ email });
        if (exist) return res.status(400).json({ error: "User already exist" });
      }
  
      await agent.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            firstName,
            lastName,
            email,
            phone,
            whatsApp,
            adresse,
            vehicule,
            idCard,
            dateOfBirth,
          },
        }
      );
      return res.status(200).json({ message: "User data updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  //deleteAgent

const deleteAgent = async (req, res) => {
    const { id } = req.params;
    try {
      await agent.findByIdAndDelete({ _id: id });
  
      return res.status(200).json({ message: "delete succesfuly" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };



exports.deleteAgent = deleteAgent;
exports.updateAgent = updateAgent;
exports.getAgent = getAgent;
exports.getAllAgent = getAllAgent;
exports.addAgent= addAgent;