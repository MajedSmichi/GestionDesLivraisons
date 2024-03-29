const agent = require("../models/agentModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const updatePwdEmail = require("../utils/updatePwdEmail");
const jwt = require("jsonwebtoken");
const notification = require("../models/notificationModel");
const feedBack = require("../models/feedBackModel");
const admin = require("../models/adminModel");

///middleware/auth
const authAgent = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    const isLogin = await agent.findOne({ email: req.user.username });
    if (!isLogin) {
      res.status(401).send("unauthorized");
    }
    next();
  } catch (error) {
    console.log({ error });
    res.status(400).send("Invalid token");
  }
};
//upload photo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fieldName = file.fieldname;
    const fileName = Date.now() + "-" + fieldName + "-" + file.originalname;

    req["locals"] = { [fieldName]: "uploads/" + fileName };

    cb(null, fileName);
  },
});

const uploadd = multer({ storage: storage });

const uploadPhotoAgent = async (req, res) => {
  const userId = req.params.userId;

  const user = await client.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }

  user.photoUrl = req.locals.filePath;
  user.cardPhoto1 = req.locals.filePath;
  user.cardPhoto2 = req.locals.filePath;

  await user.save();
  res.send("File uploaded successfully!");
};

//get notification agent

const getNotificationagent = async (req, res) => {
  try {
    const data = await notification.find();

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//get user
const getAgent = async (req, res) => {
  const { username } = req.user;
  try {
    const user = await agent.findOne({ email: username }).select("-password");
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
const getAllAgent = async (req, res) => {
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
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    whatsApp,
    adresse,
    vehicule,
    idCard,
    dateOfBirth,
  } = req.body;
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
      vehicule,
      idCard,
      dateOfBirth,
      photoUrl:req.locals.filePath
    };
    console.log(user)
    await agent.create(user);
    return res.status(201).json({ message: "user create" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};
//update user from dashbord admin
const updateAgentt = async (req, res) => {
  const { firstName, lastName, email, phone, whatsApp, adresse, dateOfBirth } =
    req.body;
  const { id } = req.params;
  try {
    const user = await agent.findById(id);
    if (email !== user.email) {
      const exist = await agent.findOne({ email });
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
    };

    if (req.locals?.filePath) newUser.photoUrl = req.locals.filePath;

    await agent.findByIdAndUpdate(
      { _id: id },
      {
        $set: newUser,
      }
    );
    await notification.create({
      data: "Admin is update your data",
      receiver: id,
    });
    return res.status(200).json({ message: "User data updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//update Agent

const updateAgent = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    whatsApp,
    adresse,
    dateOfBirth,
    vehicule,
    idCard,
  } = req.body;

  const { username } = req.user;

  try {
    const user = await agent.findOne({ email: username });
    if (email !== user.email) {
      const exist = await agent.findOne({ email: username });
      if (exist) return res.status(400).json({ error: "User already exist" });
    }
    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      whatsApp,
      adresse,
      vehicule,
      idCard,
      dateOfBirth,
    };

    if (req.files) {
      if (req.files["photo"]) {
        const photoPath = req.files["photo"][0].path;
        newUser.photoUrl = photoPath;
      }
      if (req.files["cardPhoto1"]) {
        const cardPhoto1Path = req.files["cardPhoto1"][0].path;
        newUser.cardPhoto1 = cardPhoto1Path;
      }
      if (req.files["cardPhoto2"]) {
        const cardPhoto2Path = req.files["cardPhoto2"][0].path;
        newUser.cardPhoto2 = cardPhoto2Path;
      }
    }
    await agent.findOneAndUpdate(
      { email: username },
      {
        $set: newUser,
      }
    );
    await notification.create({
      data: `${user.firstName} ${user.lastName} update their data`,
    });
    return res.status(200).json({ message: "Agent data updated" });
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

//change password

const changePasswordAgent = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  const { username } = req.user;
  try {
    const user = await agent.findOne({ email: username });
    if (newPassword === "" || confirmPassword === "") {
      return res.status(400).json({ error: "enter your password" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await agent.findOneAndUpdate(
      { email: username },
      {
        $set: { password: user.password }, // Pass an object with the updated password
      }
    );
    const subject = "update password";
    const email = user.email;
    const bodyEmail = "ur password is update successfully";
    await updatePwdEmail(email, subject, bodyEmail);
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getFeedBack = async (req, res) => {
  const { username } = req.user;

  try {
    const user=(await agent.findOne({ email: username })) ||
      (await admin.findOne({ email: username }));
    const data = await feedBack.find();
    console.log("test")
    if (user.role === "2") {
      const result = data.filter(
        (note) => note.receiverAgent === user._id.toString()
      );
      return res.status(200).json(result);
    } else return res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

const updatePermission = async (req, res) => {
  const { permission,email } = req.body;
  try {
    const user = await agent.findOne({ email: email});
    if (user) { 
      await agent.findByIdAndUpdate(
        { _id: user._id },
        { permission: permission }
      );
      return res.status(200).json({ message: "Permission changed successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    
  }
}

exports.authAgent = authAgent;
exports.uploadd = uploadd;
exports.uploadPhotoAgent = uploadPhotoAgent;
exports.deleteAgent = deleteAgent;
exports.updateAgent = updateAgent;
exports.updateAgentt = updateAgentt;
exports.getAgent = getAgent;
exports.getAllAgent = getAllAgent;
exports.addAgent = addAgent;
exports.changePasswordAgent = changePasswordAgent;
exports.getNotificationagent = getNotificationagent;
exports.getFeedBack=getFeedBack;
exports.updatePermission=updatePermission;
