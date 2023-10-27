import userApi from '../services/users'
const authModule = {
  namespaced: true,

  state() {
    return {
      isLogin: false,
      user: {},
    };
  },

  mutations: {
    setLogin(state) {
      state.isLogin = true;
    },
    setLogout(state) {
      state.isLogin = false;
      state.user = {};
    },
    setUser(state, user) {
      state.user.id = user.value;
    },
  },
  actions:{
    async initializeUser({ commit }) {
      try {
        const response = await userApi.getUser();
        commit("setLogin");
        commit({ type: "setUser", value: response.data.id });
      } catch (error) {
        commit("setLogout");
      }
    },
  },

  getters: {
    getisLogin(state) {
      return state.isLogin;
    },
    getUserId(state) {
      
      return state.user.id;
    },
  },
};

export default authModule;
