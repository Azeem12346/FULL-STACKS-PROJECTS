if (process.env.NODE_ENV != "production"){
//REQUIRING ENV FILE
require('dotenv').config();
}

//REQUIRING EXPRESS
const express= require("express");
const app = express();
//REQUIRING MONGOOSE
const mongoose = require("mongoose");
//REQUIRING EJS PATH
const path = require ("path");
app.set("view engine", ("ejs"));
app.set("views", path.join(__dirname, ("views")));
app.use(express.urlencoded({extended: true}));
//REQUIRING EJS MATE
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
//REQUIRING STATIC FILE FOR  STYLYING ON EVERY PAGE
app.use(express.static(path.join(__dirname,"/public")));
//SETTING METHOD OVERRIDE
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
//Requiring Custom error class from CustomError file
const ExpressError = require("./utils/ExpressError.js");
//REQUIROING SESSION
const session = require("express-session");
//ONLINE MONGO SESSION
const MongoStore = require("connect-mongo").default;

//REQUIRING FLASH
const flash = require("connect-flash");
//REQUIRING PASSPORT AND LOCAL STRATEGY
const passport = require("passport");
const LocalStrategy = require("passport-local");
//REQUIRING USER MODEL
const User = require("./models/user.js");


//REQUIRING ROUTER FILES
const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const { isMarkedAsUntransferable } = require("worker_threads");
//FETCHING ONLINE DATABASE LINK FROM.ENV
const dbUrl= process.env.ATLASDB_URL;

//CONNECTING DATABASE WITH ASYNC FUNCTION
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(dbUrl);
}


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err);
});


//SESSION OPTIONS
const sessionOptions ={
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 *1000,
        maxAge: 7 * 24 * 60 *1000,
        httpOnly: true
    },
};


//app.get("/", (req, res)=>{
  //  res.send("Hi im root");
//});





//USING SESSION
app.use(session(sessionOptions));
//USING FLASH
app.use(flash());
//INITIALIZING PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

//DEMO USER ROUTE
//app.get("/demouser", async (req, res) => {
  //  let fakeUser = new User({
    //    email: "student@gmail.com",
      //  username: "delta-student"
    //});

   //let registeredUser = await User.register(fakeUser,  "helloworld");
   //res.send(registeredUser);
//});



//selecting default path for routes listings.js inside route folder
app.use("/listings", listingRouter);
//selecting default path for review.js inside route folder
app.use("/listings/:id/reviews", reviewRouter);
//Using and selecting default path for signup router
app.use("/", userRouter);

    
//NEW ROUTE Where inserting data to dbs
//app.get("/testListing", async(req, res) =>{
//let sampleListing = new Listing ({
  // title: "My new villa",
   //description: "By the beach",
    //price: 1200,
    //location: "calangute, goa",
    //country:"india",
//});
 //await sampleListing.save();
 //console.log("Sample was saved");
 //res.send("successfull testing");
//});

//Sending standard response
app.use((req, res, next) => {
    next(new ExpressError(404, "page not found"));
});


//MIDDLEWARE FOR HANDLING ERORS
app.use((err, req, res, next) => {
    let { statusCode=500, message="something went wrong" } = err;
    res.status(statusCode).render("eror.ejs", {message});
    //res.status(statusCode).send(message);
});







 //LISTING SEARCH ROUTE
     app.get("/listings", async (req, res) => {

    const { search } = req.query;

    let allListings;

    if (search) {
        allListings = await Listing.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { country: { $regex: search, $options: "i" } }
            ]
        });
    } else {
        allListings = await Listing.find({});
    }

    res.render("listings/index.ejs", { allListings });
});


 //CREATING SERVER FOR LISTENREQ
app.listen(8080, ()=>{
    console.log("app is listening on port 8080");
});
