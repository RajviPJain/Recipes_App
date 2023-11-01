const UserRecipeService = require("../services/userRecipeService");
const RecipeService = require("../services/recipeService");

class UserRecipeController {
  async getRecipe(req, res,next) {
    try {
     
      const recipesDetails = await RecipeService.getUserRecipes(req.user.id,req.user.id);
      return res.status(200).json(recipesDetails);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async postRecipe(req, res,next) {
    try {
     
      const recipe = await UserRecipeService.postRecipes(
        req.body.recipe,
        req.user.id
      );
      return res.status(200).json(recipe);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async updateRecipe(req, res,next) {
    try {
    
        const updatedRecipe = await UserRecipeService.updateRecipe(
          req.params.recipe_id,
          req.body.recipe_details
        );
       return res.status(200).send('Updated Successfully');
   
  
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async deleteRecipe(req, res,next) {
    try {

        const deletedRecipe = await UserRecipeService.deleteRecipe(
          req.params.recipe_id
        );
        res.status(200).send("deleted successfully");

     
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async userLikedRecipe(req,res,next){
    try{

      const userLiked=await UserRecipeService.getUserLikedRecipe(req.user.id)
      res.status(200).send(userLiked)
    }catch(error){
      console.log(error)
      next(error);
    }
  }

  async deleteIngredient(req,res,next){
     try{
      
            const deleteIngredient=await UserRecipeService.deleteIngredient(req.params.ingredient_id)
            res.status(200).send('Deleted Ingredient Successfully')
   
     
      
     }catch(error){
      console.log(error)
      next(error);
    }
  }

  async addIngredient(req,res,next){
    try{
     
        const addIngredient=await UserRecipeService.addIngredient(req.body.ingredient,req.params.recipe_id)
        res.status(200).send(addIngredient)
  
        
    }
    catch(error){
      console.log(error)
      next(error);
    }
  }

  async updateIngredient(req,res,next){
    try{
      
            
        const updateIngredient=await UserRecipeService.updateIngredient(req.body.ingredient,req.params.recipe_id)
        res.status(200).send(updateIngredient)
   

    }
    catch(error){
      console.log(error)
      next(error);
    }
  }
}
module.exports = new UserRecipeController();
