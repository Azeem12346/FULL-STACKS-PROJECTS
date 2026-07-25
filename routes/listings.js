
const express = require("express");
// REQUIRING ROUTER
const router = express.Router();
//REQUIRING WRAPASYNC FUNCTION
const wrapAsync = require("../utils/wrapAsync.js");
//Requiring Custom error class from CustomError file
//REQUIRING LISTING
const Listing = require("../models/listing.js");
//REQUIRING ISLOGGEDIN
const { isLoggedIn , isOwner ,validateListing } = require("../middleware.js");
//REQUIRING CONTROLLLER
const listingController = require("../controllers/listings.js");
//REQUIRING MULTER AND UPLOAD
const multer = require('multer')
//REQUIRING CLOUDINARY STORAGE FILE
const { storage } = require("../cloudConfig.js");
//REQUIRING UPLOAD
const upload = multer({ storage });




//FOR INDEX AND CREATE ROUTE
router.route("/")
.get( wrapAsync(listingController.index))
.post(
  isLoggedIn,

    upload.single('listing[image]'),
     validateListing,
     wrapAsync (listingController.createListing)
);


 //NEW ROUTE
router.get("/new",isLoggedIn, listingController.renderNewForm);

//FOR SHOW UPDATE AND DELETE REQUEST
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing, wrapAsync (listingController.updateListing))
    .delete(
    isLoggedIn,
    isOwner,
    wrapAsync (listingController.deleteListing));





//EDIT ROUTE FOR SHOW.EJS
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
     wrapAsync (listingController.editListings));



    
//LISTING SEARCH ROUTE
     router.get("/listings", async (req, res) => {

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


module.exports = router;