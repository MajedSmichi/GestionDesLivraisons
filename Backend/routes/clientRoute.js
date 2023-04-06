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
  getNotification,
  getEmail,
  updateNotification,
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
  updateAgentt,
  getNotificationagent,
} = require("../controllers/userDataAgent");
const {
  getAdmin,
  updateAdmin,
  uploadAdmin,
  changePasswordAdmin,
  authAdmin,
  getNotificationAdmin,
} = require("../controllers/userDataAdmin");
const router = Router();


/********************************************Customer route ****************************************************/

//get customer route
router.get("/getCustomer", auth, getuser);

router.get("/AllCustomersUsers",auth, getAllCustomersUsers);

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
router.post("/addAgent",authAdmin, uploadd.single("photo"), addAgent);

//get agent
router.get("/getAgent",authAgent, getAgent);

//get All Agent
router.get("/getAllAgent",auth, getAllAgent);

//update agent
router.put(
  "/updateAgentt",authAgent,
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

//update agent data 
router.put("/updateAgent/:id",authAdmin,updateAgentt);

//get admin route
router.get("/getAdmin", authAdmin, getAdmin);



//update admin route
router.put("/updateAdmin", authAdmin, uploadAdmin.single("photo"), updateAdmin);

//update password
router.put("/updatePasswordAdmin", authAdmin, changePasswordAdmin);


/*******************************************route agent +admin + client*************************************************/

//get notification 
router.get("/getNotification",auth,getNotification);


//update status notification
router.put("/updateNotification",auth,updateNotification);

module.exports = router;
