const RecipeService = require("../services/recipeService");
class RecipeController {
  async getRecipe(req, res,next) {
    try {
      const recipeId = req.params.recipe_id;

      const recipeDetail = await RecipeService.getRecipe(recipeId);
      return res.status(200).json(recipeDetail);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllRecipe(req, res,next) {
    try {

      const recipesDetails = await RecipeService.getRecipes(req.query);
      return res.status(200).json(recipesDetails);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getRecipeByCategory(req, res,next) {
    try {
      console.log(req.params.category_id);
      const recipesDetails = await RecipeService.getRecipeByCategory(
        req.params.category_id,req.query.page
      );
      return res.status(200).json(recipesDetails);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getUserRecipe(req, res,next) {
    try {
      // console.log(req.params.user_id);
        const recipesDetails = await RecipeService.getUserRecipes(
          req.params.user_id,req.user.id
        );
        return res.status(200).json(recipesDetails);
   

    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getCategories(req, res,next) {
    try {
      const categories = await RecipeService.getCategories();
      return res.status(200).json(categories);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  async getLikeUsers(req, res,next) {
    try {
      // console.log('h',req.params.recipe_id);
      const Users = await RecipeService.getLikeUsers(req.params.recipe_id);
      return res.status(200).json(Users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async postLike(req, res,next) {
    try {
      const like = await RecipeService.postLikes(req.user.id, req.params.recipe_id);
      return res.status(200).json(like);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getComment(req, res,next) {
    try {
      // console.log('h',req.params.recipe_id);
      const comments = await RecipeService.getComments(req.params.recipe_id);
      return res.status(200).json(comments);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async postComment(req, res,next) {
    try {
      console.log(req.body);
      const comment = await RecipeService.postComments(
        req.user.id,
        req.params.recipe_id,
        req.body.comment
      );
      return res.status(200).json(comment);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async unlike(req, res,next) {
    try {
      const unlike = await RecipeService.unlike(req.user.id, req.params.recipe_id);
      return res.status(200).json(unlike);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async deleteComment(req, res,next) {
    try {
      const userId = req.user.id;
   
        const deleteComment = await RecipeService.deleteComment(
          req.params.comment_id
        );
        return res.status(200).json('Deleted Successfully');
 
  
   
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = new RecipeController();
