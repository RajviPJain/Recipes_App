<template>
  <v-card class="mb-16 index">
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar color="black" prominent>
        <v-icon icon="mdi-pot-steam-outline" class="pl-5"></v-icon>

        <v-toolbar-title>Recipes</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              class="pt-5"
              single-line
              variant="outlined"
              style="width: 0px"
              placeholder="Search..."
            ></v-text-field>

            <v-btn icon="mdi-filter" v-bind="props"></v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="category in categories"
              :key="category.id"
              :to="'/recipe/category/' + category.id"
            >
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-app-bar-nav-icon
          v-if="!getisLogin()"
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-list-item
          v-else
          color="primary"
          class="pr-0"
          prepend-icon="mdi-account"
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-list-item>
        <!--   
          <v-btn variant="text" icon="mdi-filter"> -->

        <!-- </v-btn> -->
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="right" temporary>
        <v-list-item
          to="/recipe"
          prepend-icon="mdi-home"
          title="Home"
          value="home"
        ></v-list-item>
        <v-list-item
          v-if="getisLogin()"
          to="/user/myrecipes"
          prepend-icon="mdi-nutrition"
          value="My recipes"
          title="My Recipes"
        ></v-list-item>

        <v-list-item
          v-if="getisLogin()"
          to="/user/profile"
          prepend-icon="mdi-account-edit"
          value="Profile"
          title="Profile"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-login"
          value="logout"
          @click="logout()"
          v-if="getisLogin()"
        >
          logout
        </v-list-item>
        <v-list-item prepend-icon="mdi-login" value="login" to="/login" v-else>
          login
        </v-list-item>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script>
import userApi from "../services/users";
export default {
  data: () => ({
    drawer: false,
    group: null,
    categories: [],

    login: true,
  }),

  methods: {
    async getCategories() {
      await this.$store.dispatch("category/fetchCategories");
      this.categories = this.$store.getters["category/getCategories"];
    },
    getisLogin() {
      this.login = this.$store.getters["auth/getisLogin"];
      return this.login;
    },
    async logout() {
      await userApi.logout();
      await this.$store.commit("auth/setLogout");

      this.getisLogin();
      this.$router.push({ path: "/login" });
    },
  },

  created() {
    this.getCategories();
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style scoped>
.index {
  z-index: unset;
}
</style>
