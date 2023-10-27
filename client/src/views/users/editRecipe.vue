<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-pencil" @click="getRecipe()"> </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Recipe Update</span>
        </v-card-title>

        <v-img
          class="align-end text-white"
          height="200"
          :src="
            recipe.image_url ||
            'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
          "
          cover
        >
        </v-img>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="Title*"
                  required
                  :error-messages="v$.title.$errors.map((e) => e.$message)"
                  v-model="v$.title.$model"
                  @input="v$.title.$touch"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Duration*"
                  :error-messages="v$.duration.$errors.map((e) => e.$message)"
                  v-model="v$.duration.$model"
                  @input="v$.duration.$touch"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Serving*"
                  :error-messages="v$.serving.$errors.map((e) => e.$message)"
                  v-model="v$.serving.$model"
                  @input="v$.serving.$touch"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="12">
                <v-select
                  :items="items"
                  item-title="name"
                  item-value="id"
                  label="Category*"
                  :error-messages="v$.id.$errors.map((e) => e.$message)"
          v-model="v$.id.$model"
              @input="v$.id.$touch"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <v-list>
                  <h2>Ingredients</h2>
                  <v-list-item
                    v-for="(ingredient, index) in existingIngredients"
                    :key="index"
                  >
                    <v-list-item-title>
                      {{ ingredient?.ingredient?.name }} -
                      {{ ingredient?.quantity }}
                      <v-btn
                        icon="mdi-pencil"
                        @click="
                          editIngredient(index, ingredient?.ingredient?.id)
                        "
                      ></v-btn>
                      <v-btn
                        icon="mdi-delete"
                        @click="deleteIngredient(index, ingredient.id)"
                      ></v-btn>
                    </v-list-item-title>
                    <v-list-item-action> </v-list-item-action>
                  </v-list-item>
                </v-list>

                <h2>Add or Update Ingredient</h2>
                <v-text-field
                :error-messages="v$.newIngredient.$errors.map((e) => e.$message)"
          v-model="v$.newIngredient.$model"
              @input="v$.newIngredient.$touch"
                  label="Ingredient Name"
                ></v-text-field>
                <v-text-field
                  v-model="newQuantity"
                  label="Quantity"
                ></v-text-field>
                <v-btn @click="addIngredient(recipe.id)">Add Ingredient</v-btn>
                <v-btn @click="saveIngredient(recipe.id)" v-if="editIndex >= 0"
                  >Update Quantity</v-btn
                >
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  prepend-icon="mdi-file-document-edit"
                  label="Procedure*"
                  :error-messages="v$.description.$errors.map((e) => e.$message)"
          v-model="v$.description.$model"
              @input="v$.description.$touch"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  prepend-icon="mdi-camera"
                  accept="image/*"
                  label="Update image url"
                  :error-messages="v$.imageurl.$errors.map((e) => e.$message)"
          v-model="v$.imageurl.$model"
              @input="v$.imageurl.$touch"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-btn class="me-4" type="submit" @click="updateRecipe(recipe.id)">
            Update
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import recipeapi from "../../services/recipes";
import userRecipeapi from "../../services/userRecipes";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  url,
  integer,
  
} from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  props: ["recipeId"],
  data: () => ({
    dialog: false,
    recipe: [],
    title: "",
    description: "",
    duration: "",
    serving: null,
    imageurl: "",
    ingredientId: null,
    id: "",
    items: [],

    existingIngredients: [],
    newIngredient: "",
    newQuantity: null,
    editIndex: -1,
  }),
  beforeRouteLeave () {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (!answer) return false
},
  validations() {
    return {
      title: {
        required,
        minLength: minLength(3),
      },
      description: {
        required,
        minLength: minLength(30),
        maxLength: maxLength(1000),
      },
      duration: {
        required,
        
      },
      serving: {
        required,
        integer,
      },
      id: {
        required,
      },
      imageurl: {
        url,
      },
      newIngredient: {
        minLength: minLength(3),
      },
    };
  },
  methods: {
    async getCategories() {
     
      this.items = this.$store.getters['category/getCategories']
    },
    async getRecipe() {
      try {
        const response = await recipeapi.getRecipedetails(this.recipeId);

        this.recipe = response.data.recipe;
        this.title = this.recipe.title;
        this.description = this.recipe.description;
        this.duration = this.recipe.duration;
        this.serving = this.recipe.serving;
        this.imageurl = this.recipe.image_url;
        this.existingIngredients = this.recipe.recipe_ingredient_qties;
        this.id=this.recipe.category_id


        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    async addIngredient(recipeId) {
      try {
        const params = {
          ingredient: {
            name: this.newIngredient,
            quantity: this.newQuantity,
          },
        };
        const response = await userRecipeapi.addIngredient(recipeId, params);
        console.log(response.data);
        this.existingIngredients.push({
          ingredient: {
            name: this.newIngredient,
            id: response.data.ingredient_id,
          },
          quantity: this.newQuantity,
          id: response.data.id,
        });
        console.log(this.existingIngredients);
        this.newIngredient = "";
        this.newQuantity = "";
        this.editIndex = -1;
      } catch (error) {
        console.log(error);
      }
    },
    editIngredient(index, id) {
      this.ingredientId = id;
      console.log(this.ingredientId);
      this.editIndex = index;
      this.newIngredient = this.existingIngredients[index].ingredient.name;
      this.newQuantity = this.existingIngredients[index].quantity;
    },
    async saveIngredient(recipeId) {
      try {
        console.log(this.ingredientId);
        const params = {
          ingredient: {
            name: this.newIngredient,
            quantity: this.newQuantity,
            id: this.ingredientId,
          },
        };
        const updateIngredient = await userRecipeapi.updateIngredient(
          recipeId,
          params
        );
        console.log(updateIngredient);
        if (this.editIndex >= 0) {
          this.existingIngredients[this.editIndex].ingredient.name =
            this.newIngredient;
          this.existingIngredients[this.editIndex].quantity = this.newQuantity;
          this.editIndex = -1;
          this.newIngredient = "";
          this.newQuantity = "";
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteIngredient(index, ingredientId) {
      try {
        const response = await userRecipeapi.deleteIngredient(ingredientId);
        console.log(response);
        this.existingIngredients.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    },

    async updateRecipe(recipeId) {
      this.v$.$touch()
        if(!this.v$.$invalid){
          try {
        const params = {
          recipe_details: {
            title: this.title,
            description: this.description,
            duration: this.duration,
            serving: this.serving,
            imageurl: this.imageurl,
            category_id:this.id
          },
        };
        const response = await userRecipeapi.updateRecipe(recipeId, params);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
        }

    
    },
  },
  created(){
    this.getCategories()
  }
};
</script>
