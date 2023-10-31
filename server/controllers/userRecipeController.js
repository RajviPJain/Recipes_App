const UserRecipeService = require("../services/userRecipeService");
const RecipeService = require("../services/recipeService");

class UserRecipeController {
  async getRecipe(req, res) {
    try {
     
      const recipesDetails = await RecipeService.getUserRecipes(req.user.id);
      return res.status(200).json(recipesDetails);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }
  async postRecipe(req, res) {
    try {
     
      const recipe = await UserRecipeService.postRecipes(
        req.body.recipe,
        req.user.id
      );
      return res.status(200).json('Posted Successfully');
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }
  async updateRecipe(req, res) {
    try {
    
        const updatedRecipe = await UserRecipeService.updateRecipe(
          req.params.recipe_id,
          req.body.recipe_details
        );
       return res.status(200).send('Updated Successfully');
   
  
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  async deleteRecipe(req, res) {
    try {

        const deletedRecipe = await UserRecipeService.deleteRecipe(
          req.params.recipe_id
        );
        res.status(200).send("deleted successfully");

     
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  async userLikedRecipe(req,res){
    try{

      const userLiked=await UserRecipeService.getUserLikedRecipe(req.user.id)
      res.status(200).send(userLiked)
    }catch(error){
      console.log(error)
      return res.status(500).send('Internal Server Error');
    }
  }

  async deleteIngredient(req,res){
     try{
      
            const deleteIngredient=await UserRecipeService.deleteIngredient(req.params.ingredient_id)
            res.status(200).send('Deleted Ingredient Successfully')
   
     
      
     }catch(error){
      console.log(error)
      return res.status(500).send('Internal Server Error');
    }
  }

  async addIngredient(req,res){
    try{
     
        const addIngredient=await UserRecipeService.addIngredient(req.body.ingredient,req.params.recipe_id)
        res.status(200).send(addIngredient)
  
        
    }
    catch(error){
      console.log(error)
      return res.status(500).send('Internal Server Error');
    }
  }

  async updateIngredient(req,res){
    try{
      
            
        const updateIngredient=await UserRecipeService.updateIngredient(req.body.ingredient,req.params.recipe_id)
        res.status(200).send(updateIngredient)
   

    }
    catch(error){
      console.log(error)
      return res.status(500).send('Internal Server Error');
    }
  }
}
module.exports = new UserRecipeController();
