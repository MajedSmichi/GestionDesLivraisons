const { Router } = require("express");
const { signup, login } = require("../controllers/authentification");
const router = Router(); // create router to create route bundle
const { body, validationResult } = require('express-validator');



router.post('/', (req, res) => {
    console.log('body',req.body)
    res.send('Hello World!')
  })

// Login route
router.post("/login",login);
//Signup route
router.post("/signup",body('email').isEmail(),
body('password').isLength({ min: 5 }),
body('phone').isLength(8),signup)

module.exports = router