//REQUIRING LISTING MODEL
const Listing = require("../models/listing.js");
//REQUIRING REVIEW MODEL
const Review = require ("../models/review.js");


//CREATE REVIEW ROUTE
module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    console.log("new review saved");
    res.redirect(`/listings/${listing._id}`);
  };

  //DELETE REVIEW ROUTE
  module.exports.deleteReview = async(req,res)=>{
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(
        id,
        {$pull: {reviews: reviewId}}
    );

    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");

    res.redirect(`/listings/${id}`);
};
  