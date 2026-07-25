//This file contains schema of joi tool

//Requiring joi
const joi = require('joi');

//defining and exporting scheman for existing listingSchema with help of joi
module.exports.listingSchema = joi.object({
   listing: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    location: joi.string().required(),
     country: joi.string().required(),
     price: joi.number().required().min(0),
     image:joi.string().allow("", null),

}).required() 
});

module.exports.reviewSchema = joi.object({
   review: joi.object({
      rating: joi.number().required().min(1).max(5),
      comment: joi.string().required(),
   }).required(),
});