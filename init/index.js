const mongoose = require("mongoose");
//REQUIRING DATA.JS FOR USE THE DATA 
const initData = require("./data.js");

//REQUIRING LISTING
const Listing = require("../models/listing.js");


//CONNECTING DATABASE WITH ASYNC FUNCTION
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async()=>{
    //DELETING OLD DATA FROM DATABSE LISTINGS
     await Listing.deleteMany({});
     //DEFINING OWNER FOR ALL LISTINGS
     initData.data = initData.data.map((obj) => ({  ...obj, owner: '6a4a9933d810388825b5ef32'}));
     //SAVING DATA FROM DATA FILE
     await Listing.insertMany(initData.data);
     console.log("Data was initialized");
}

initDB();