const express = require("express");
const userController = require("../controllers/userController");
const passport = require("passport");
const userRouter = express.Router();
const cors = require('cors');

require("../middleware/auth");
require("../middleware/googleAuth")
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
    res.status(200).send({ message: "Login Successful", user: req.user });
  }
);

userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);


userRouter.get(
  "/auth/google/authcallback",
  passport.authenticate("google", {
    failureRedirect: "/users/auth/google",
  }),  (req, res) => {
     
    res.redirect('http://localhost:8080')
  }
);

userRouter.get("/me", isAuthenticated, userController.getUser); //to get my profile
userRouter.patch("/me", isAuthenticated, userController.updateUser); //to update my profile.
userRouter.patch(
  "/me/password",
  isAuthenticated,
  userController.updatePassword
);
userRouter.post("/me/verify", isAuthenticated, userController.verifyPassword);
userRouter.get("/logout", userController.logout);

module.exports = userRouter;
