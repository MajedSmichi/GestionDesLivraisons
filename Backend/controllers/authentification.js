const client = require("../models/clientModel");
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const { body, validationResult } = require("express-validator");
const agent = require("../models/agentModel");
const sendEmail = require("../utils/sendEmail");
const admin = require("../models/adminModel");
const notification= require("../models/notificationModel");

///middleware/auth
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

//register route
const signup = async (req, res) => {
  const { role, firstName, lastName, email, phone, password } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    // check if the user exists
    const exist =
      role === "1"
        ? await client.findOne({ email: req.body.email })
        : await agent.findOne({ email: req.body.email });
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
      role,
    };
    if (role == "1") {
      await client.create(user);
      await notification.create({
        data: `${user.firstName} ${user.lastName} create account as client`,
      });
    } else {
      await agent.create(user);
      await notification.create({
        data: `${user.firstName} ${user.lastName} create account as agent`,
      });
    }

    return res.status(201).json({ message: "user create" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

//login route
const login = async (req, res) => {
  try {
    // check if the user exists+
    const user =
      req.body.role === "1"
        ? await client.findOne({ email: req.body.email })
        : await agent.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ error: "user not register yet" });
    }
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      // sign token and send it in response
      const role = req.body.role;
      const token = await jwt.sign(
        { username: user.email },
        process.env.SECRET
      );
      res.json({ token, role, user: user._id });
    } else {
      res.status(400).json({ error: "Email or Password are false" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};

const recoverPassword = async (req, res) => {
  const { email, role } = req.body;
  try {
    const user =
      role === "1"
        ? await client.findOne({ email })
        : await agent.findOne({ email });
    if (!user) return res.status(400).json({ error: "email is not exist" });

    const subject = "recover password";
    const newPassword = Math.random().toString(36).slice(-8);
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();
    await sendEmail(email, subject, newPassword);
    return res.status(200).json({ message: "sent succus" });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const AdminLog = async (req, res) => {
  const role = "0";
  try {
    const user = await admin.findOne();
    const result = await bcrypt.compare(req.body.password, user.password);

    if (result) {
      // sign token and send it in response

      const token = await jwt.sign(
        { username: user.email },
        process.env.SECRET
      );
      res.json({ token, user: user._id, role });
    } else {
      res.status(400).json({ error: "Password is false" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};

exports.auth = auth;
exports.recoverPassword = recoverPassword;
exports.login = login;
exports.signup = signup;
exports.AdminLog = AdminLog;
