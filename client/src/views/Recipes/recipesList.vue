<template>
  <v-row align="center" justify="center">
    
    <h1 v-if="recipes.length === 0">No recipes</h1>
    <v-col
      v-else
      v-for="recipe in filteredRecipes"
      :key="recipe.id"
      cols="auto"
    >
      <v-card
        :loading="loading"
        class="mx-auto my-4"
        width="350"
        variant="outlined"
        elevation="16"
      >
     
        <template v-slot:loader="{ isActive }">
          <v-progress-linear
            :active="isActive"
            color="deep-purple"
            height="3"
            indeterminate
          ></v-progress-linear>
        </template>
        <v-list-item class="w-100">
          <v-list-item :to="'/recipe/user/' + recipe.user_id" class="px-0">
            <template v-slot:prepend>
              <v-avatar
                color="grey-darken-3"
                :image="
                  recipe.user.imageurl ||
                  'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
                "
              ></v-avatar>
            </template>

            <v-list-item-title>{{ recipe.user.username }}</v-list-item-title>
          </v-list-item>
        </v-list-item>

        <v-img
          cover
          height="200"
          :src="
            recipe.image_url ||
            'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
          "
        ></v-img>

        <v-list-item :to="'/recipe/' + recipe.id" class="nopadding">
          <v-card-item>
            <v-card-title>{{ recipe.title }}</v-card-title>

            <v-card-subtitle>
              <span class="me-1">{{ recipe.category?.name }}</span>
            </v-card-subtitle>
          </v-card-item>
        </v-list-item>

        <div class="px-4 d-flex py-3 justify-space-between">
          <p>Duration:{{ recipe.duration }}</p>
          <p>Serving:{{ recipe.serving }}</p>
        </div>
        <v-divider class="mx-4 mb-1"></v-divider>
        <v-card-actions>
          <v-list-item class="w-100">
            <div class="justify-space-between">
              <v-icon
                icon="mdi-heart"
                @click="unlike(recipe.id)"
                v-if="liked_id.includes(recipe.id)"
                style="cursor: pointer"
              ></v-icon>
              <v-icon
                icon="mdi-heart-outline"
                v-else
                @click="like(recipe.id)"
                style="cursor: pointer"
              ></v-icon>
              <span class="subheading me-2">{{ recipe.likeCount }}</span>
            </div>
          </v-list-item>
        </v-card-actions>
      </v-card>
      
    </v-col >
    <v-col v-if="isEmpty" cols="12" sm="12" md="4">
      <h3>No more recipes...</h3>
    </v-col>
   
  </v-row>
</template>

<script>
import recipeapi from "../../services/recipes";
import userRecipeapi from "../../services/userRecipes";

export default {
  props: ["categoryId"],
  data: () => ({
    loading: false,
    selection: 1,
    recipes: [],

    delete: 0,
    add: 0,

    search: "",
    liked_id: [],
    page: 1,

    isEmpty: false,
  }),

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },


    async getRecipes() {
      try {
        if (this.categoryId) {
          const response = await recipeapi.getRecipesByCategory(
            this.categoryId,
            this.page
          );
          this.recipes = response.data.rows;
        } else {
          if (this.search) {
            const response = await recipeapi.searchRecipes(
              this.search,
              this.page
            );
            this.recipes = response.data.rows;
          } else {
            const response = await recipeapi.getRecipes(this.page);
            console.log("Recipes", response.data.rows.length);
            if (response.data.rows.length === 0) {
              this.isEmpty = true;
            } else {
              this.recipes.push(...response.data.rows);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    getisLogin() {
      this.login = this.$store.getters["auth/getisLogin"];
      return this.login;
    },
    async getuserLikedRecipes() {
      if (this.getisLogin()) {
        try {
          const response = await userRecipeapi.getuserLikedRecipes();

          this.liked_id = response.data.map((item) => item.recipeId);
          console.log(this.liked_id);
        } catch (error) {
          console.log(error);
        }
      }
    },

    async like(recipeId) {
      console.log(recipeId, "liked");
      try {
        await userRecipeapi.postLike(recipeId);

        this.liked_id.push(recipeId);
        this.recipes = this.recipes.map((recipe) => {
          if (recipe.id === recipeId) {
            return { ...recipe, likeCount: parseInt(recipe.likeCount) + 1 };
          }
          return recipe;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async unlike(recipeId) {
      try {
        const response = await userRecipeapi.deleteLike(recipeId);
        console.log(response);
        this.liked_id = this.liked_id.filter((like) => like !== recipeId);
        this.recipes = this.recipes.map((recipe) => {
          if (recipe.id === recipeId) {
            return { ...recipe, likeCount: parseInt(recipe.likeCount) - 1 };
          }
          return recipe;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    filteredRecipes() {
      return this.recipes;
    },
  },
  created() {
    window.addEventListener("beforeunload", () => {
      window.scrollTo(0, 0);
    });
    window.onscroll = () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight;

      console;
      if (bottomOfWindow) {
        console.log("bottom", bottomOfWindow);
        if (!this.isEmpty) {
          this.page++;
          this.getRecipes(this.page);
        }
      }
    };
    this.getRecipes(this.page);
    this.getuserLikedRecipes();
  },
  watch: {
    categoryId() {
      this.getRecipes();
    },
  },
};
</script>

<style scoped>
.nopadding {
  padding: 0 !important;
}
</style>
