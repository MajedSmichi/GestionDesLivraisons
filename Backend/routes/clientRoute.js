const { Router } = require("express");
const { signup, login, recoverPassword, AdminLog } = require("../controllers/authentification");
const router = Router(); // create router to create route bundle
const { body, validationResult } = require('express-validator');
const { update, getuser, getAllCustomersUsers, deleteuser } = require("../controllers/userData");



//delete route
router.delete("/delete/:id",deleteuser);
//get route
router.get("/user/:id",getuser);
router.get("/AllCustomersUsers",getAllCustomersUsers);
//save route
router.put("/update/:id",update);
// Login route
router.post("/login",login);
//Signup route
router.post("/signup",body('email').isEmail(),
body('password').isLength({ min: 5 }),
body('phone').isLength(8),signup)

router.post("/admin",AdminLog)
router.post("/recover",recoverPassword)

module.exports = router