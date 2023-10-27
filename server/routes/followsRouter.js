const express = require("express");
const FollowsController = require("../controllers/followsController");
const followsRouter = express.Router();
const isAuthenticated = require("../middleware/isAuth");

followsRouter.get("/follower",isAuthenticated, FollowsController.getFollower); //to get my follower
followsRouter.get("/following", isAuthenticated,FollowsController.getFollowing); //to get my following

followsRouter.post("/:user_id/follow",isAuthenticated, FollowsController.follow); //to follow someone

followsRouter.delete("/:user_id/unfollow",isAuthenticated, FollowsController.unFollow); //to unfollow someone

followsRouter.delete("/:user_id/follower", isAuthenticated,FollowsController.removeFollower); //to delete my follower
module.exports = followsRouter;
