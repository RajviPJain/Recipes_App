const FollowsService = require("../services/followsService");
class FollowsController {
  async getFollower(req, res) {
    try {
      const follower = await FollowsService.getFollower(req.user.id);
      res.status(200).send(follower);
    } catch (error) {
      console.error(error);
    }
  }

  async getFollowing(req, res) {
    try {
      const following = await FollowsService.getFollowing(req.user.id);
      res.status(200).send(following);
    } catch (error) {
      console.error(error);
    }
  }

  async follow(req, res) {
    try {
      await FollowsService.follow(req.user.id, req.params.user_id);
      res.status(200).send("followed succesfully");
    } catch (error) {
      console.log(error["errors"][0].message);
      //   if(erro)
      res.send(error["errors"][0].message);
    }
  }

  async unFollow(req, res) {
    try {
      console.log(req.params)
      await FollowsService.unFollow(req.user.id,req.params.user_id);
      res.status(200).send("unfollowed succesfully");
    } catch (error) {}
  }

  async removeFollower(req, res) {
    try {
      console.log(req.params.user_id)
      await FollowsService.unFollow(req.user.id,req.params.user_id);
      res.status(200).send("unfollowed succesfully");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}
module.exports = new FollowsController();
