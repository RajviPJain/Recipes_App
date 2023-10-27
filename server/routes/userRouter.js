const express = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");
const userRouter = express.Router();
require("../middleware/auth");
const isAuthenticated = require("../middleware/isAuth");

//me use userController
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
// userRouter.get("/logout", userController);
userRouter.get(
    "/localauth",
    passport.authenticate("jwt", {
      session: true,
    }),
    (req, res) => {
     
      res.status(200).send({message:'Login Successful',user:req.user})
    }
  );
  
userRouter.get("/me",isAuthenticated, userController.getUser); //to get my profile
userRouter.patch("/me", isAuthenticated,userController.updateUser); //to update my profile.
userRouter.get("/logout", userController.logout);

module.exports = userRouter;
