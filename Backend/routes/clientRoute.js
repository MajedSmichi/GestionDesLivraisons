const { Router } = require("express");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const client = require("../models/clientModel");
const {
  signup,
  login,
  recoverPassword,
  AdminLog,
} = require("../controllers/authentification");

const {
  update,
  getuser,
  getAllCustomersUsers,
  deleteuser,
  addCustomer,
  upload,
  uploadPhoto,
} = require("../controllers/userDataCustomer");

const {
  updateAgent,
  getAgent,
  getAllAgent,
  deleteAgent,
  addAgent,
} = require("../controllers/userDataAgent");
const router = Router();

/********************************************Customer route ****************************************************/
//delete customer route
router.delete("/delete/:id", deleteuser);

//get customer route
router.get("/getCustomer/:id", getuser);

router.get("/AllCustomersUsers", getAllCustomersUsers);

//addCustomer
router.post("/addCustomer", addCustomer);

//update Customerr oute
router.put("/update/:id", update);

/********************************************Agent route ****************************************************/
//delete agent route
router.delete("/deleteAgent/:id", deleteAgent);

//add agent route
router.post("/addAgent", addAgent);

//get agent
router.get("/getAgent/:id", getAgent);

//get All Agent
router.get("/getAllAgent", getAllAgent);

//update agent
router.put("/updateAgent/:id", updateAgent);

//post photo
router.post("/upload/:userId", upload.single("photo"), uploadPhoto);

/****************************************Authentification route *****************************/
// Login route
router.post("/login", login);

//Signup route
router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("phone").isLength(8),
  signup
);

//adminlogin route
router.post("/admin", AdminLog);

//recover password
router.post("/recover", recoverPassword);

module.exports = router;
