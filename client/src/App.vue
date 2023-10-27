<template>
  <navBar></navBar>

  <router-view></router-view>
</template>

<script>
import navBar from "../src/components/navBar.vue";
import userApi from "../src/services/users";
export default {
  components: {
    navBar,
  },
 
  methods: {
    async getUser() {
  
      try {
        const response = await userApi.getUser();
        console.log('App.vue');
        this.$store.commit("auth/setLogin");
        this.$store.commit({ type: "auth/setUser", value: response.data.id });
      } catch (error) {
        
        this.$store.commit("auth/setLogout");
      }
    },
  },
  created() {
    // this.getUser();
  },
};
</script>

<style></style>
