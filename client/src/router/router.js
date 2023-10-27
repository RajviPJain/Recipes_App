import { createRouter, createWebHistory } from "vue-router";
import Recipes from "../views/Recipes/recipesList.vue";
import RecipeDetails from "../views/Recipes/recipeDetails.vue";
import UserRecipes from "../views/Recipes/userRecipes.vue";
import MyRecipes from "../views/users/myRecipes.vue";
import EditRecipes from "../views/users/editRecipe.vue";
import UserProfile from "../views/users/userProfile.vue";
import Login from "../views/users/loginIn.vue";
import SignUp from "../views/users/signUp.vue";
import store from "../store/index";
import userApi from "../services/users";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/recipe" },
    {
      name: "recipe",
      path: "/recipe",
      component: Recipes,
    },
    {
      name: "login",
      path: "/login",
      component: Login,
      meta: {
        requiresUnauth: true,
      },
    },
    {
      name: "signup",
      path: "/signUp",
      component: SignUp,
      meta: {
        requiresUnauth: true,
      },
    },
    {
      name: "recipeDetails",
      path: "/recipe/:id",
      component: RecipeDetails,
      props: true,
    },
    {
      name: "userRecipes",
      path: "/recipe/user/:userId",
      component: UserRecipes,
      props: true,
    },
    {
      name: "categoryRecipes",
      path: "/recipe/category/:categoryId",
      component: Recipes,
      props: true,
    },
    {
      name: "Myrecipes",
      path: "/user/myrecipes",
      component: MyRecipes,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: "Edit Recipes",
      path: "/user/edit/:recipeId",
      component: EditRecipes,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: "Profile",
      path: "/user/profile",
      component: UserProfile,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },

    { path: "/:notFound(.*)", redirect: "/recipe" },
  ],
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch("auth/initializeUser");
  if (to.meta.requiresAuth && store.getters["auth/getUserId"] === undefined) {
    console.log('Route')
    next("/login");
  } else if (to.meta.requiresUnauth && store.getters["auth/getisLogin"]) {
    await userApi.logout();
    store.commit("auth/setLogout");
    next();
  } else {
    next();
  }

});

export default router;
