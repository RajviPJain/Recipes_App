import api from "./api";

export default {
  getUser() {
    return api.get(`/users/me`);
  },
  getFollowers() {
    return api.get(`follows/follower`);
  },
  getFollowing() {
    return api.get(`follows/following`);
  },

  unfollow(id) {
    console.log(id)
    return api.delete(`follows/${id}/unfollow`);
  },

  removeFollower(id) {
    console.log(id)
    return api.delete(`follows/${id}/follower`);
  },

  follow(id) {
    return api.post(`follows/${id}/follow`);
  },

  login(userdetails) {
    return api.post(`users/login`, userdetails);
  },

  logout() {
    return api.get(`users/logout`);
  },

  registerUser(userdetails) {
    return api.post(`users/register`, userdetails);
  },

  verifyPassword(userdetails) {
    return api.post(`users/me/verify`, userdetails);
  },

  updatePassword(userdetails) {
    return api.patch(`users/me/password`, userdetails);
  },

  updateUser(userdetails) {
    return api.patch(`users/me`, userdetails);
  },

  googleAuth() {
    return api.get("users/auth/google");
  },
};
