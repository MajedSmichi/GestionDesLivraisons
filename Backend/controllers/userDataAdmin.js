const multer = require("multer");
const admin = require("../models/adminModel");


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
    const { id } = req.params;
    try {
      const user = await admin.findById(id).select("-password");
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
    const { id } = req.params;
   
    try {
      
      const user = await admin.findById(id);
      if (email !== user.email) {
        const exist = await admin.findOne({ email });
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
  
      await admin.findByIdAndUpdate(
        { _id: id },
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













  exports.uploadAdmin=uploadAdmin;
  exports.uploadPhoto=uploadPhoto;
  exports.getAdmin=getAdmin;
  exports.updateAdmin=updateAdmin;