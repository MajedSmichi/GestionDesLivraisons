const multer = require("multer");
const admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const notification= require("../models/notificationModel");

///middleware/auth
const authAdmin=async(req, res, next) => {
  try {
    
    const token = req.header("Authorization");
    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    const isAdmin = await  admin.findOne({email:req.user.username})
    if(!isAdmin) {
      res.status(401).send('unauthorized')
    }
    next();
  } catch (error) {
    console.log({error})
    res.status(400).send("Invalid token");
  }
};

//upload photo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const fileName = Date.now() + "-" + file.originalname;
      
      req["locals"] = {filePath : "uploads/" + fileName}
      cb(null, fileName);
    }
  });
  
  const uploadAdmin = multer({ storage: storage });
  
  const uploadPhoto=async (req, res) => {
    const userId = req.params.userId;
    
  
    const user = await admin.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
  
    user.photoUrl = req.locals.filePath
   
  
    await user.save();
    res.send("File uploaded successfully!");
  };

//get admin data

const getAdmin = async (req, res) => {
    const { username } = req.user;
    try {
      const user = await admin.findOne({email:username}).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
     
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

//update admin data


const updateAdmin=async (req, res) => {
    const { firstName, lastName, email, phone, whatsApp, adresse, dateOfBirth } = req.body;
    const { username } = req.user;
   
    try {
      
      const user = await admin.findOne({email:username});
      if (email !== user.email) {
        const exist = await admin.findOne({ email:username });
        if (exist) return res.status(400).json({ error: "User already exist" });
      }
  
      const newUser = {
        firstName,
        lastName,
        email,
        phone,
        whatsApp,
        adresse,
        dateOfBirth,
      }
      
      if(req.locals?.filePath) newUser.photoUrl = req.locals.filePath
  
      await admin.findOneAndUpdate(
        { email:username },
        {
          $set: newUser,
        }
      );
    
      return res.status(200).json({ message: "User data updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

//update password
const changePasswordAdmin = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { username } = req.user;

  try {
    const user = await admin.findOne({email:username});

    // if (!user) {
    //   return res.status(404).json({ error: "Admin not found" });
    // }

    if (newPassword === "" || confirmPassword === "") {
      return res.status(400).json({ error: "Please enter your password" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;

    await admin.findOneAndUpdate({email:username}, { password: user.password });

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error: " + error.message });
  }
};

  












  exports.authAdmin=authAdmin;
  exports.uploadAdmin=uploadAdmin;
  exports.uploadPhoto=uploadPhoto;
  exports.getAdmin=getAdmin;
  exports.updateAdmin=updateAdmin;
  exports.changePasswordAdmin=changePasswordAdmin;
  