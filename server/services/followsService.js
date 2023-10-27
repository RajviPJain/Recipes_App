const FollowsRepository = require("../repository/followsRepository");

class FollowService {
  async follow(follower_id, followee_id) {
    const result = await FollowsRepository.follow(follower_id, followee_id);
    return true;
  }
  async unFollow(follower_id, followee_id) {
    const result = await FollowsRepository.unFollow(follower_id, followee_id);
    return true;
  }
  async getFollower(user_id) {
    const follower = await FollowsRepository.getFollower(user_id);
    return follower;
  }
  async getFollowing(user_id) {
    const following = await FollowsRepository.getFollowing(user_id);
    return following;
  }
}

module.exports = new FollowService();
