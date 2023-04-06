const { validationResult } = require("express-validator");
const multer = require("multer");
const client = require("../models/clientModel");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const updatePwdEmail = require("../utils/updatePwdEmail");
const notification = require("../models/notificationModel");
const agent = require("../models/agentModel");
const admin = require("../models/adminModel");


//upload photo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + "-" + file.originalname;

    req["locals"] = { filePath: "uploads/" + fileName };
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const uploadPhoto = async (req, res) => {
  const userId = req.params.userId;

  const user = await client.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }

  user.photoUrl = req.locals.filePath;

  await user.save();
  res.send("File uploaded successfully!");
};

//updateClientLocation
const updateClientLocation = async (req, res) => {
  const { longitude, latitude } = req.body;
  const { username } = req.user;
  try {
    const response = await client.findOneAndUpdate(
      { email: username },
      {
        $set: {
          longitude,
          latitude,
        },
      }
    )||await agent.findOneAndUpdate(
      { email: username },
      {
        $set: {
          longitude,
          latitude,
        },
      }
    )
   
    return res.status(200).json({ message: "User data updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//update user
const update = async (req, res) => {
  const { firstName, lastName, email, phone, whatsApp, adresse, dateOfBirth } =
    req.body;
  const { username } = req.user;
  try {
    const user = await client.findOne({ email: username });
    if (email !== user.email) {
      const exist = await client.findOne({ email: username });
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

    await client.findOneAndUpdate(
      { email: username },
      {
        $set: newUser,
      }
    );
    await notification.create({
      data: `${user.firstName} ${user.lastName} update their data`,
    });
    return res.status(200).json({ message: "User data updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//update user from dashbord admin
const updateClient = async (req, res) => {
  const { firstName, lastName, email, phone, whatsApp, adresse, dateOfBirth } =
    req.body;
  const { id } = req.params;
  try {
    const user = await client.findById(id);
    if (email !== user.email) {
      const exist = await client.findOne({ email });
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

    await client.findByIdAndUpdate(
      { _id: id },
      {
        $set: newUser,
      }
    );
    await notification.create({
      data: "Admin update your data",
      receiver: id,
    });
    return res.status(200).json({ message: "User data updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
//add customer in admin dashboard
const addCustomer = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    whatsApp,
    adresse,
    photoUrl,
  } = req.body;
  role = "1";

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const exist = await client.findOne({ email: req.body.email });
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
      photoUrl: req.locals.filePath,
    };
    await client.create(user);
    return res.status(201).json({ message: "user create" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

//get user
const getuser = async (req, res) => {
  const { username } = req.user;

  try {
    const user = await client.findOne({ email: username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//get All users
const getAllCustomersUsers = async (req, res) => {
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

//get notification

const getNotification = async (req, res) => {
  const { username } = req.user;
  try {
    const user =
      (await client.findOne({ email: username })) ||
      (await agent.findOne({ email: username })) ||
      (await admin.findOne({ email: username }));
    const data = await notification.find();
    if (user.role === "0") {
      const result = data.filter((note) => note.receiver === "0");
      return res.status(200).json(result);
    } else {
      const result = data.filter(
        (note) => note.receiver === user._id.toString()
      );
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//update status of notification
const updateNotification = async (req, res) => {
  const { username } = req.user;
  
  try {
    const user =
      (await client.findOne({ email: username })) ||
      (await agent.findOne({ email: username })) ||
      (await admin.findOne({ email: username }));
    const dataToUpdate =
      user.role === "0"
        ? await notification.find({ receiver: "0" })
        : await notification.find({ receiver: user._id.toString() });
    dataToUpdate.map(
      async (note) =>
        await notification.findByIdAndUpdate(
          { _id: note._id },
          { status: "ancien" }
        )
    );

    return res
      .status(200)
      .json({ message: "status notifications changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


//deleteuser
const deleteuser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await client.findByIdAndDelete({ _id: id });

    return res.status(200).json({ message: "delete succesfuly" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//change password

const changePassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  const { username } = req.user;
  const { id } = req.params;
  try {
    const user = await client.findOne({ email: username });
    if (newPassword === "" || confirmPassword === "") {
      return res.status(400).json({ error: "enter your password" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await client.updateOne(
      { email: username },
      {
        $set: { password: user.password }, // Pass an object with the updated password
      }
    );
    const subject = "update password";
    const email = user.email;
    const bodyEmail = "Your password is update successfully";
    await updatePwdEmail(email, subject, bodyEmail);
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.upload = upload;
exports.uploadPhoto = uploadPhoto;
exports.deleteuser = deleteuser;
exports.update = update;
exports.getuser = getuser;
exports.getAllCustomersUsers = getAllCustomersUsers;
exports.addCustomer = addCustomer;
exports.updateClientLocation = updateClientLocation;
exports.changePassword = changePassword;
exports.updateClient = updateClient;
exports.getNotification = getNotification;
exports.updateNotification = updateNotification;

