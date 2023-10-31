<template>
  <navBar></navBar>

  <router-view></router-view>
</template>

<script>
import navBar from "../src/components/navBar.vue";

export default {
  components: {
    navBar,
  },
 
  methods: {
 
  },
  created() {

  },
};
</script>

<style></style>
