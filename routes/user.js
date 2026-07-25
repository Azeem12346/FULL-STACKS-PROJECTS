const express = require("express");
// REQUIRING ROUTER
const router = express.Router();
//REQUIRING USER MODEL
const User = require("../models/user.js");
//REQUIRING WRAPASYNC
const wrapAsync = require("../utils/wrapAsync");
//REQUIRING PASSPORT
const passport = require("passport");
//REQUIRING REDIRECT URL
const { saveRedirectUrl } = require("../middleware.js");
//REQUIRING USERCONTROLLER
const userController= require("../controllers/users.js");

router.get("/signup", userController.renderSignupForm);

router.post("/signup",  wrapAsync(userController.signup));

router.get("/login", userController.renderLoginForm);

router.post(
    "/login", 
    saveRedirectUrl,
     passport.authenticate("local", {
      failureRedirect: '/login',
       failureFlash: true
     }),
     userController.login
     );

router.get("/logout",userController.logout)


module.exports = router;