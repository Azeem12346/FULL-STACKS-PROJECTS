const User = require("../models/user");



//RENDER LOGIN FORM
module.exports.renderLoginForm =(req, res) => {
    res.render("users/login.ejs");

};

//RENDER SIGNUP FORM
 module.exports.renderSignupForm = (req, res) => {
     res.render("users/signup.ejs");
 
 };

//SIGNUP ROUTE
module.exports.signup=async(req, res) => {
    try{
        let {username, email, password} = req.body;
    const newUser = new User({email , username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
     if(err) {
        return next(err);
     }
    req.flash("success", "user was registered successfully");
    res.redirect("/listings");
    });
    
    } catch(e){

        req.flash("error", e.message);
        res.redirect("/signup");

    }

};

//REQUIRING FLASH MSG FOR LOGIN
module.exports.login = async(req, res) => {
        req.flash("success", "welcome to wanderlust ! you are logged in!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);

};

//REQUIRING LOGOUT
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
         return   next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
};
