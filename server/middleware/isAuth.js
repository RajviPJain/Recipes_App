const isAuthenticated = async (req, res, next) => {
   
    // console.log(req)
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send("Please Authenticate"); // Redirect to login if not authenticated
  };
  
module.exports = isAuthenticated;