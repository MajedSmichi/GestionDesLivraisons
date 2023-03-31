const { Router } = require("express");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const client = require("../models/clientModel");
const {
  signup,
  login,
  recoverPassword,
  AdminLog,
  auth,
} = require("../controllers/authentification");

const {
  update,
  getuser,
  getAllCustomersUsers,
  deleteuser,
  addCustomer,
  upload,
  updateClientLocation,
  changePassword,
} = require("../controllers/userDataCustomer");

const {
  updateAgent,
  getAgent,
  getAllAgent,
  deleteAgent,
  addAgent,
  uploadd,
  changePasswordAgent,
} = require("../controllers/userDataAgent");
const { getAdmin, updateAdmin, uploadAdmin, changePasswordAdmin, authAdmin } = require("../controllers/userDataAdmin");
const router = Router();
/********************************************Admin route ****************************************************/
//get admin route
router.get("/getAdmin/:id",getAdmin);

//update admin route
router.put("/updateAdmin/:id", uploadAdmin.single("photo"), updateAdmin);

//update password
router.put("/updatePasswordAdmin/:id",changePasswordAdmin);


/********************************************Customer route ****************************************************/


//get customer route
router.get("/getCustomer",auth,getuser);

router.get("/AllCustomersUsers", getAllCustomersUsers);

//addCustomer
router.post("/addCustomer", upload.single("photo"), addCustomer);

//update Customer route
router.put("/update/:id", upload.single("photo"), update);

//location
router.put("/update-location/:id", updateClientLocation);

//update password
router.put("/updatePassword",auth,changePassword);
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


//update password
router.put("/updatePasswordAgent/:id",changePasswordAgent);
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
/****************************************Admin route ****************************************/
//adminlogin route
router.post("/adminLog", AdminLog);

//recover password
router.post("/recover", recoverPassword);

//delete customer route
router.delete("/delete/:id",authAdmin, deleteuser);

module.exports = router;
