<template>
  <v-card class="mx-auto mt-5" width="900">
    <v-img
      class="align-end text-white"
      height="400"
      :src="
        recipe.image_url ||
        'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
      "
      cover
    >
      <v-card-title>{{ recipe.title }}</v-card-title>
    </v-img>

    <v-list-item class="w-100 mt-2">
      <template v-slot:prepend>
        <v-avatar
          color="grey-darken-3"
          image="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
        ></v-avatar>
      </template>

      <v-list-item-title>{{ recipe.user?.username }}</v-list-item-title>
    </v-list-item>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <div>
              <h2>Procedure</h2>
              <div>
                <p class="mt-4">{{ recipe.description }}</p>
              </div>
            </div>
          </v-col>
          <v-col>
            <div>
              <h2>Ingredients</h2>

              <v-list-item
                v-for="ingredient in recipe.recipe_ingredient_qties"
                :key="ingredient.id"
                :title="ingredient.ingredient.name + '-' + ingredient.quantity"
                class="pl-0 pt-3"
              ></v-list-item>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-text class="pb-0">
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="comment"
              append-icon="mdi-send"
              variant="solo-filled"
              clear-icon="mdi-close-circle"
              clearable
              label="Comment"
              type="text"
              @click:append="sendComment(recipe.id)"
              @click:clear="clearComment"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title @click="showComments()">
          Comments {{ commentsCount }}
        </v-expansion-panel-title>
        <v-expansion-panel-text v-for="comment in comments" :key="comment.id">
          <h3>{{ comment?.user?.username }}</h3>
          {{ comment.comment }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import recipeapi from "../../services/recipes";
import userRecipeapi from "../../services/userRecipes";
export default {
  data() {
    return {
      comment: "Hey!",
      recipe: [],
      comments: [],
      likesCount: null,
      commentsCount: null,
      liked_id: null,
    };
  },
  props: ["id"],
  methods: {
    async getRecipedetails() {
      try {
        console.log(this.id);
        const response = await recipeapi.getRecipedetails(this.id);
        console.log(response);
        this.recipe = response.data.recipe;
        this.likesCount = response.data.likesCount;
        this.commentsCount = response.data.commentsCount;
      } catch (error) {
        console.log(error);
        this.$toast.error(error.response.data.error);
      }
    },
    async sendComment(recipeId) {
      try {
        const params = {
          comment: this.comment,
        };
        const response = await userRecipeapi.postComment(recipeId, params);
        if (response.status === 200) {
          this.comments.push(this.comment);
          this.commentsCount++;
          this.clearComment();
        }
      } catch (error) {
        console.log(error);
        this.$toast.error(error.response.data.error);
      }
    },
    clearComment() {
      this.comment = "";
    },

    async showComments() {
      try {
        const response = await recipeapi.getComments(this.id);

        this.comments = response.data;
      } catch (error) {
        console.log(error);
        this.$toast.error(error.response.data.error);
      }
    },
  },
  created() {
    this.getRecipedetails();
  },
  watch: {
    id() {
      this.getRecipedetails();
    },
  },
};
</script>

<style></style>
