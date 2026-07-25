const express = require("express");
// REQUIRING ROUTER
const router = express.Router({mergeParams: true});
//REQUIRING WRAPASYNC FUNCTION
const wrapAsync = require("../utils/wrapAsync.js");
//Requiring Custom error class from CustomError file
const ExpressError = require("../utils/ExpressError.js");
//requiring joi Listingschema
const { listingSchema, reviewSchema } = require("../schema.js"); 
//requiring review model
const Review = require("../models/review.js");
//REQUIRING LISTING
const Listing = require("../models/listing.js");
//REQUIRING VALIDATE REVIEW
const { validateReview, isLoggedIn, isreviewAuthor } = require("../middleware.js");
const { createReview } = require("../controllers/reviews.js");
//REQUIRING REVIEW CONTROLLER.JS
const reviewController = require("../controllers/reviews.js");


 




// post Route for submiting reviews from show.ejs
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);



//Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isreviewAuthor,
   wrapAsync(reviewController.deleteReview));

module.exports = router;