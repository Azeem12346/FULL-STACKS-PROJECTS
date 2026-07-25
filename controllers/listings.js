//REQUIRING LISTINGS
const Listing = require("../models/listing");




//CONTROLLERS FRO ALL LISTINGS

//LISTINGS ROUTE
module.exports.index = async (req, res) => {

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

    res.render("listings/index", { allListings });
};

//NEW ROUTE
module.exports.renderNewForm = (req,res) => {
   res.render("listings/new") 
};


//SHOW ROUTE
module.exports.showListing = async(req, res) =>{
 let {id} = req.params;
   const listing =await Listing.findById(id)
   .populate({path:"reviews",
    populate:{
        path: "author",
    },
    })
   .populate("owner");
   if(!listing){
    req.flash("error", "listing you requested for does not exist!");
    res.redirect("/listings");
   }
res.render("listings/show",{ listing } );
};

//CREATE ROUTE 
module.exports.createListing = async(req, res,next) =>{
    //broughting new listing image from cloud
     let url =req.file.path;
     let filename = req.file.filaname;
//GATHERINF FROM FROM BODY OF NEW.EJS
    const newListing=  new Listing(req.body.listing);
//OWNER PROPERTY
    newListing.owner = req.user._id;
    newListing.image ={url, filename};
//SAVING IN DATABSE
    await newListing.save();
req.flash("success", "New Listing Created!");
res.redirect("/listings"); 
};


//EDIT ROUTE
module.exports.editListings = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
};


//UPDATE ROUTE
module.exports.updateListing =async(req, res)=>{
  let { id } = req.params;
let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
if(typeof req.file !=="undefined"){
let url =req.file.path;
 let filename = req.file.filaname;
 listing.image = { url,filename };
 await listing.save();
}

req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};


//DELETE ROUTE 
module.exports.deleteListing = async(req, res)=>{
    let  { id } = req.params;
     let deletedListing=  await Listing.findByIdAndDelete(id);
     console.log(deletedListing);
     req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};