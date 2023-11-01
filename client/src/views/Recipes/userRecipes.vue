<template>
  <v-card class="mx-auto " width="1000" >
    <v-list-item>
      <template v-slot:prepend>
        <v-avatar
          color="grey-darken-3"
          :image="
            userRecipes[0]?.user.imageurl ||
            'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
          "
        ></v-avatar>
      </template>

      <v-list-item-title>{{ userRecipes[0]?.user.username }}</v-list-item-title>

      <template v-slot:append>
        <v-card-actions>
          <v-row align="center" justify="center">
            <v-col cols="auto">
              <v-icon class="me-1 px-3" icon="mdi-account-heart"></v-icon>{{ followerCount }}
            </v-col>

            <v-col cols="auto">
              <v-icon class="me-1 px-3" icon="mdi-account-group"></v-icon>{{ followingCount }}
            </v-col>

            <v-col cols="auto">
              <v-icon v-if="isFollowing && userRecipes[0]?.user_id!==uId" class="me-1" icon="mdi-account-minus" style="cursor: pointer;" @click="unfollow(userRecipes[0].user_id)"></v-icon>
              <v-icon v-if="!isFollowing && userRecipes[0]?.user_id!==uId" class="me-1" icon="mdi-account-plus" style="cursor: pointer;" @click="follow(userRecipes[0].user_id)"></v-icon>
            </v-col>
          </v-row>
        </v-card-actions>
      </template>
    </v-list-item>
    <v-divider class="mx-4 mb-1"></v-divider>
    <v-container>
      <v-row dense>
        <v-col v-for="recipe in userRecipes" :key="recipe.id" col="auto" class="d-flex justify-center">
          <v-card variant="outlined" width="400" elevation="16" class="mb-3">
            <v-list-item class="pa-0" :to="'/recipe/' + recipe.id">
              <v-img
                :src="recipe.image_url"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2)"
                height="200px"
                cover
              >
                <v-card-title
                  class="text-white"
                  :v-text="recipe.title"
                  color="black"
                  >{{ recipe.title }}</v-card-title
                >
              </v-img>
            </v-list-item>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                size="small"
                v-if="liked_id.includes(recipe.id)"
                color="surface-variant"
                variant="text"
                icon="mdi-heart"
                @click="unlike(recipe.id)"
                style="cursor: pointer"
              ></v-btn>

              <v-btn
                size="small"
                v-else
                color="surface-variant"
                variant="text"
                icon="mdi-heart-outline"
                style="cursor: pointer"
                @click="like(recipe.id)"
              ></v-btn>
              <span>{{ recipe.likeCount }}</span>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import recipeapi from "../../services/recipes";
import userRecipeapi from "../../services/userRecipes";
import userapi from "../../services/users"

export default {
  props: ["userId"],
  data() {
    return {
      userRecipes: [],
      liked_id: [],
      followerCount:null,
      followingCount:null,
      isFollowing:false,
      uId:null
    };
  },
  methods: {
    async getUserRecipes() {
      try {
        this.uId=this.$store.getters["auth/getUserId"]
        console.log(this.uId)
       
        const response = await recipeapi.getUserRecipes(this.userId);
        console.log(response)
        this.userRecipes = response.data.recipes.rows;
        this.followerCount=response.data.followerCount
        this.followingCount=response.data.followingCount
        this.isFollowing=response.data.isFollowing
      } catch (error) {
        console.log(error);
       this.$toast.error(error.response.data.error);
      }
    },
    async getuserLikedRecipes() {
      try {
        const response = await userRecipeapi.getuserLikedRecipes();

        this.liked_id = response.data.map((item) => item.recipeId);
        console.log(this.liked_id);
      } catch (error) {
        console.log(error);
       this.$toast.error(error.response.data.error);
      }
    },
    async like(recipeId) {
      console.log(recipeId, "liked");
      try {
        const response = await userRecipeapi.postLike(recipeId);
        console.log(response);
        this.liked_id.push(recipeId);
        this.userRecipes = this.userRecipes.map((recipe) => {
          if (recipe.id === recipeId) {
            return { ...recipe, likeCount: parseInt(recipe.likeCount) + 1 };
          }
          return recipe;
        });
      } catch (error) {
        console.log(error);
       this.$toast.error(error.response.data.error);
      }
    },
    async unlike(recipeId) {
      console.log(recipeId, "unliked");

      try {
        const response = await userRecipeapi.deleteLike(recipeId);
        console.log(response);
        this.liked_id = this.liked_id.filter((like) => like !== recipeId);
        this.userRecipes = this.userRecipes.map((recipe) => {
          if (recipe.id === recipeId) {
            return { ...recipe, likeCount: parseInt(recipe.likeCount) - 1 };
          }
          return recipe;
        });
      } catch (error) {
        console.log(error);
       this.$toast.error(error.response.data.error);
      }
    },

    async follow(id){
      try{
         const follow=await userapi.follow(id)
         console.log(follow)
         this.$toast.success(
              "Followed Successfully"
            );
         this.followerCount++
         this.isFollowing=true
      }
      catch(error){
        console.log(error)
       this.$toast.error(error.response.data.error);
      }
    },


    async unfollow(id){
      try{
        console.log('hi')
         const unfollow=await userapi.unfollow(id)
         console.log(unfollow)
         this.$toast.success(
              "Unfollowed Successfully"
            );
         this.followerCount--
         this.isFollowing=false
      }
      catch(error){
        console.log(error)
       this.$toast.error(error.response.data.error);
      }
    }
  },
  created() {
    this.getUserRecipes();
    this.getuserLikedRecipes();
  },
  watch: {
    userId() {
      this.getUserRecipes();
    },
  },
};
</script>

<style></style>
