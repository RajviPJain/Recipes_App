<template>
  <v-row justify="end" class="pa-5">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="black" v-bind="props" icon="mdi-pencil"> </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Recipe</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="Title*"
                  
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

              <v-col cols="7">
                <v-text-field
                :error-messages="v$.newIngredient.name.$errors.map((e) => e.$message)"
          v-model="v$.newIngredient.name.$model"
              @input="v$.newIngredient.name.$touch"
                  label="Ingredient Name*"
                  @keydown.enter.prevent="addIngredient"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                :error-messages="v$.newIngredient.quantity.$errors.map((e) => e.$message)"
          v-model="v$.newIngredient.quantity.$model"
              @input="v$.newIngredient.quantity.$touch"
                  label="Quantity*"
                  @keydown.enter.prevent="addIngredient"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn @click="addIngredient">Add</v-btn>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-chip
                  closable
                  v-for="(ingredient, index) in selectedIngredients"
                  :key="index"
                  @click:closable="removeIngredient(index)"
                >
                  {{ ingredient.name }} ({{ ingredient.quantity }})
                </v-chip>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  prepend-inner-icon="mdi-file-document-edit"
                  label="Procedure*"
                  :error-messages="v$.description.$errors.map((e) => e.$message)"
          v-model="v$.description.$model"
              @input="v$.description.$touch"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  prepend-inner-icon="mdi-camera"
                  accept="image/*"
                  label="Image Url*"
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
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="postRecipes()">
            Post
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>


import userRecipeapi from "../../services/userRecipes";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength,maxLength,url,integer} from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  emits:['pushRecipe'],
  data() {
    return {
      newIngredient: {
        name: "",
        quantity: "",
      },
      selectedIngredients: [],
      dialog: false,
      title: "",
      description: "",
      duration: "",
      imageurl:"",
      serving: 1,
      items: [],
      id: null,
      ingredients: {},
    };
  },

  validations(){
    return{

      title: {
          required,
          minLength: minLength(3)
        },
      description:{
         required,
         minLength:minLength(30),
         maxLength: maxLength(1000),
      },
      duration:{
         required,
        
      },
      serving:{
        required,
        integer
      },
      id:{
          required
      },
      imageurl:{
            url
      },
      newIngredient:{
        name:{
       
          minLength:minLength(3),

        },
        quantity:{
          minLength:minLength(1),
        }
      }
    }
  },
  methods: {
    addIngredient() {
      if (
        this.newIngredient.name.trim() !== "" &&
        this.newIngredient.quantity.trim() !== ""
      ) {
        this.selectedIngredients.push({ ...this.newIngredient });
        this.newIngredient.name = "";
        this.newIngredient.quantity = "";
      }
    },
    removeIngredient(index) {
      this.selectedIngredients.splice(index, 1);
    },

    async postRecipes() {
      this.v$.$touch()
        if(!this.v$.$invalid){
            console.log('Valid')
            this.dialog = false;
      
            for (const {name, quantity} of this.selectedIngredients) {
              this.ingredients[name] = quantity;
            }
            console.log(this.ingredients)
      
            const recipeDetails = {
              recipe: {
                title: this.title,
                description: this.description,
                duration: this.duration,
                serving: this.serving,
                category_id: this.id,
                ingredients: this.ingredients,
                imageurl:this.imageurl
              },
            };
            console.log(recipeDetails);
            this.dialog=false
            try {
              const response = await userRecipeapi.postRecipe(recipeDetails);
              
              this.$emit('pushRecipe',response.data.recipe);
              this.title=''
              this.description=''
              this.duration=''
              this.serving=1
              this.id=null
              this.selectedIngredients=[]
              this.imageurl=''
              this.$router.push('/user/myrecipes')
              
            } catch (error) {
              console.log(error);
            }
        }
    },
    async getCategories() {
      
      this.items = this.$store.getters['category/getCategories']
    }
    // async getCategories() {
    //   try {
    //     const response = await recipeapi.getCategories();

    //     this.items = response.data;
    //     console.log(this.items);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },

  created() {
    this.getCategories()
  },
};
</script>
