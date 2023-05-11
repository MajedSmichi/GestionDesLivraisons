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
  createDemand,
  getDemands,
  updateDemand,
  addFeedBack,
  updateDemandClientAndAdmin,
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
  getFeedBack,
  updatePermission,
} = require("../controllers/userDataAgent");
const {
  getAdmin,
  updateAdmin,
  uploadAdmin,
  changePasswordAdmin,
  authAdmin,
  getNotificationAdmin,
  claculateUsers,
  calculateUsers,
  calculateDemands,
} = require("../controllers/userDataAdmin");
const router = Router();


/********************************************Customer route ****************************************************/

//get customer route
router.get("/getCustomer", auth, getuser);

router.get("/AllCustomersUsers",auth, getAllCustomersUsers);



//update Customer route
router.put("/update", auth, upload.single("photo"), update);

//location
router.put("/update-location", auth, updateClientLocation);

//update password
router.put("/updatePassword", auth, changePassword);

//create demand
router.post("/createDemand",auth,createDemand);

router.post("/addFeedback",auth,addFeedBack);



/********************************************Agent route **************************************************************************/



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

//update permission
router.put("/updatePermission/:id",authAdmin, updatePermission);




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

//recover password
router.post("/recover", recoverPassword);


/****************************************Admin route ****************************************/
//adminlogin route
router.post("/adminLog", AdminLog);

//add agent route
router.post("/addAgent",authAdmin, upload.single("photo"), addAgent);

//addCustomer
router.post("/addCustomer",authAdmin, upload.single("photo"), addCustomer);

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

//calculate users
router.get("/calculateUsers",authAdmin,calculateUsers);
router.get("/calculateDemands",calculateDemands);


/*******************************************route agent +admin + client*************************************************/

//get notification 
router.get("/getNotification",auth,getNotification);


//update status notification
router.put("/updateNotification",auth,updateNotification);

//update statusClient and statusAdmin
router.put("/updateDemands",auth,updateDemandClientAndAdmin);


//update status notification
router.put("/updateDemands/:id",auth,updateDemand);

//get demands
router.get("/getDemands",auth,getDemands)

//get feedback
router.get("/getFeedBack",auth,getFeedBack);

module.exports = router;
