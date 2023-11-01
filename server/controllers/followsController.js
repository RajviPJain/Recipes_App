const FollowsService = require("../services/followsService");
class FollowsController {
  async getFollower(req, res,next) {
    try {
      const follower = await FollowsService.getFollower(req.user.id);
      res.status(200).send(follower);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async getFollowing(req, res,next) {
    try {
      const following = await FollowsService.getFollowing(req.user.id);
      res.status(200).send(following);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async follow(req, res,next) {
    try {
      await FollowsService.follow(req.user.id, req.params.user_id);
      res.status(200).send("followed succesfully");
    } catch (error) {
      console.log(error["errors"][0].message);
      //   if(erro)
      next(error);
    }
  }

  async unFollow(req, res,next) {
    try {
  
      await FollowsService.unFollow(req.user.id,req.params.user_id);
      res.status(200).send("unfollowed succesfully");
    } catch (error) {
      next(error);
    }
  }

  async removeFollower(req, res,next) {
    try {
      
      await FollowsService.unFollow(req.params.user_id,req.user.id,);
      res.status(200).send("unfollowed succesfully");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = new FollowsController();
