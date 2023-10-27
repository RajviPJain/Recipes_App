<template>
      <v-container>
   
      <v-row align="center" justify="center">
        <v-col v-for="recipe in userRecipes" :key="recipe.id" cols="auto">
          <v-card variant="outlined" width="350"  class="mx-auto my-4" elevation="16">
            <v-list-item class="pa-0" :to="'/recipe/' + recipe.id">
              <v-img
                :src="recipe.image_url"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2)"
                height="240px"
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
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>

              <editRecipe :recipeId=recipe.id></editRecipe>
     
              <v-btn
               
                icon="mdi-delete"
                @click="deleteRecipe(recipe.id)"
              ></v-btn>

              <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this recipe?
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1"  @click="cancelDelete">Cancel</v-btn>
          <v-btn color="red darken-1" @click="confirmDelete()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        
            </v-card-actions>
          </v-card>
        </v-col>
       
      </v-row>
      <postRecipeVue @pushRecipe="addRecipe"></postRecipeVue> 
    </v-container>
   

 
</template>

<script>
import userRecipeapi from "../../services/userRecipes";
import postRecipeVue from './postRecipe.vue';
import editRecipe from './editRecipe.vue'


export default {
  data() {
    return {
      userRecipes: [],
      deletedRecipe:0,
      dialog:false,

      recipeId:null
    };
  },

  components:{
        postRecipeVue,
        editRecipe
     },

  methods: {
    async addRecipe(recipeDetails){
      
      this.userRecipes.push(recipeDetails)
    },
    async getMyRecipes() {
      try {
        const response = await userRecipeapi.getMyRecipes();
        console.log(response);
        this.userRecipes = response.data.recipes.rows;
        // console.log( this.userRecipes[0].user.imageurl)
      } catch (error) {
        console.log(error);
      }
    },
    deleteRecipe(id) {
        // Show the deletion confirmation dialog
        this.dialog = true
        this.recipeId=id
      },
      cancelDelete() {
        // Cancel the deletion and close the dialog
        this.dialog = false
      },

    async confirmDelete(){
        try{
          console.log(this.recipeId)
        
           const response=await userRecipeapi.deleteRecipe(this.recipeId)
           console.log(response)
           this.userRecipes=this.userRecipes.filter((recipe)=>recipe.id!==this.recipeId)
           this.dialog = false
        }
        catch(error){
            console.log(error)
        }
    }
    
  },
  created() {
    this.getMyRecipes();
  },
  
};
</script>

<style></style>
