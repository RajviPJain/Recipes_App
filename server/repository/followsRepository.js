const db = require("../config/db");
var User = db.user;
var Follows = db.Follow;
var Sequelize = db.Sequelize;
class FollowsRepository {
  async follow(follower_id, followee_id) {
    console.log(followee_id);
    const follows = await Follows.create({
      followerId: follower_id,
      followeeId: followee_id,
    });
    return follows;
  }
  async unFollow(follower_id, followee_id) {
    console.log('hi')
    const unFollows = await Follows.destroy({
      where: {
        followerId: follower_id,
        followeeId: followee_id,
      },
    });
    console.log(unFollows)
    return unFollows;
  }
  async getFollower(user_id) {
    const follower = await Follows.findAll({
      attributes: {
        include: ["followerId"],
      },
      where: {
        followeeId: user_id,
      },
    });
    const followerIds = follower.map((item) => item.followerId);
    const followerDetails = await User.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: followerIds,
        },
      },
      attributes: ["id", "username", "imageurl"],
    });

    return followerDetails;
  }

  async getFollowing(user_id) {
    const following = await Follows.findAll({
      attributes: ["followeeId"],
      where: {
        followerId: user_id,
      },
    });
    const followeeIds = following.map((item) => item.followeeId);
    const followingDetails = await User.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: followeeIds,
        },
      },
      attributes: ["id", "username", "imageurl"],
    });
    return followingDetails;
  }
}
module.exports = new FollowsRepository();
// export default new FollowsRepository();
