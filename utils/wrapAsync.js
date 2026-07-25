// Exporting to app.js wrapAsync functions for handling erors

module.exports = (fn) => {
    return (req,res,next) =>{
        fn(req,res,next).catch(next);
    };
};