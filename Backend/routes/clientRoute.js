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
  updateClientLocation,
} = require("../controllers/userDataCustomer");

const {
  updateAgent,
  getAgent,
  getAllAgent,
  deleteAgent,
  addAgent,
  uploadd,
} = require("../controllers/userDataAgent");
const router = Router();

/********************************************Customer route ****************************************************/
//delete customer route
router.delete("/delete/:id", deleteuser);

//get customer route
router.get("/getCustomer/:id", getuser);

router.get("/AllCustomersUsers", getAllCustomersUsers);

//addCustomer
router.post("/addCustomer", upload.single("photo"), addCustomer);

//update Customer route
router.put("/update/:id", upload.single("photo"), update);

router.put("/update-location/:id", updateClientLocation);

/********************************************Agent route ****************************************************/
//delete agent route

router.delete("/deleteAgent/:id", deleteAgent);

//add agent route
router.post("/addAgent", uploadd.single("photo"), addAgent);

//get agent
router.get("/getAgent/:id", getAgent);

//get All Agent
router.get("/getAllAgent", getAllAgent);

//update agent
router.put(
  "/updateAgent/:id",
  uploadd.fields([
    { name: "photo", maxCount: 1 },
    { name: "cardPhoto1", maxCount: 1 },
    { name: "cardPhoto2", maxCount: 1 },
  ]),
  updateAgent
);

//post photo

/****************************************Authentification route ****************************************/
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
