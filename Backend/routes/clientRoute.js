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
  updateClient,
} = require("../controllers/userDataCustomer");

const {
  updateAgent,
  getAgent,
  getAllAgent,
  deleteAgent,
  addAgent,
  uploadd,
  changePasswordAgent,
  authAgent,
} = require("../controllers/userDataAgent");
const {
  getAdmin,
  updateAdmin,
  uploadAdmin,
  changePasswordAdmin,
  authAdmin,
} = require("../controllers/userDataAdmin");
const router = Router();


/********************************************Customer route ****************************************************/

//get customer route
router.get("/getCustomer", auth, getuser);

router.get("/AllCustomersUsers", getAllCustomersUsers);

//addCustomer
router.post("/addCustomer", upload.single("photo"), addCustomer);

//update Customer route
router.put("/update", auth, upload.single("photo"), update);

//location
router.put("/update-location", auth, updateClientLocation);

//update password
router.put("/updatePassword", auth, changePassword);
/********************************************Agent route **************************************************************************/

//add agent route
router.post("/addAgent",authAgent, uploadd.single("photo"), addAgent);

//get agent
router.get("/getAgent",authAgent, getAgent);

//get All Agent
router.get("/getAllAgent", getAllAgent);

//update agent
router.put(
  "/updateAgent",authAgent,
  uploadd.fields([
    { name: "photo", maxCount: 1 },
    { name: "cardPhoto1", maxCount: 1 },
    { name: "cardPhoto2", maxCount: 1 },
  ]),
  updateAgent
);

//update password
router.put("/updatePasswordAgent",authAgent, changePasswordAgent);
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
router.delete("/delete/:id", authAdmin, deleteuser);

//delete agent route
router.delete("/deleteAgent/:id",authAdmin, deleteAgent);

//update client data
router.put("/updateClient/:id", authAdmin, updateClient);

//get admin route
router.get("/getAdmin", authAdmin, getAdmin);

//update admin route
router.put("/updateAdmin", authAdmin, uploadAdmin.single("photo"), updateAdmin);

//update password
router.put("/updatePasswordAdmin", authAdmin, changePasswordAdmin);

module.exports = router;
