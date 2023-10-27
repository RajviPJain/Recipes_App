const UserRecipesRepository = require("../repository/userRecipesRepository");

class UserRecipeService {
  async postRecipes(recipedata, userId) {
    const recipe = await UserRecipesRepository.postRecipes(recipedata, userId);
    return recipe;
  }
  async updateRecipe(recipe_id, recipe_details) {
    const updatedRecipe = await UserRecipesRepository.updateRecipe(
      recipe_id,
      recipe_details
    );
    return updatedRecipe;
  }
  async deleteRecipe(recipe_id) {
    const deletedRecipe = await UserRecipesRepository.deleteRecipe(recipe_id);
    return deletedRecipe;
  }

  async getUserLikedRecipe(userId){
    const userLiked=await UserRecipesRepository.getUserLikedRecipe(userId)
    return userLiked
  }

  async deleteIngredient(id){
       const deleteIngredient=await UserRecipesRepository.deleteIngredient(id)
       return deleteIngredient
  }

  async addIngredient(ingredient,recipe_id){
      const addIngredient=await UserRecipesRepository.addIngredient(ingredient,recipe_id)
      return addIngredient
  }

  async updateIngredient(ingredient,recipe_id){
    const updateIngredient=await UserRecipesRepository.updateIngredient(ingredient,recipe_id)
    return updateIngredient
  }
}

module.exports = new UserRecipeService();
