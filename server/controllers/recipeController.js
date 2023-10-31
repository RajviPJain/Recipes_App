const RecipeService = require("../services/recipeService");
class RecipeController {
  async getRecipe(req, res) {
    try {
      const recipeId = req.params.recipe_id;

      const recipeDetail = await RecipeService.getRecipe(recipeId);
      return res.status(200).json(recipeDetail);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  async getAllRecipe(req, res) {
    try {

      const recipesDetails = await RecipeService.getRecipes(req.query);
      return res.status(200).json(recipesDetails);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  async getRecipeByCategory(req, res) {
    try {
      console.log(req.params.category_id);
      const recipesDetails = await RecipeService.getRecipeByCategory(
        req.params.category_id,req.query.page
      );
      return res.status(200).json(recipesDetails);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  async getUserRecipe(req, res) {
    try {
      // console.log(req.params.user_id);
        const recipesDetails = await RecipeService.getUserRecipes(
          req.params.user_id
        );
        return res.status(200).json(recipesDetails);
   

    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await RecipeService.getCategories();
      return res.status(200).json(categories);
    } catch (error) {
      // console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }
  async getLikeUsers(req, res) {
    try {
      // console.log('h',req.params.recipe_id);
      const Users = await RecipeService.getLikeUsers(req.params.recipe_id);
      return res.status(200).json(Users);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  async postLike(req, res) {
    try {
      const like = await RecipeService.postLikes(req.user.id, req.params.recipe_id);
      return res.status(200).json(like);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  async getComment(req, res) {
    try {
      // console.log('h',req.params.recipe_id);
      const comments = await RecipeService.getComments(req.params.recipe_id);
      return res.status(200).json(comments);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }

  async postComment(req, res) {
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
      return res.status(500).send('Internal Server Error');
    }
  }
  async unlike(req, res) {
    try {
      const unlike = await RecipeService.unlike(req.user.id, req.params.recipe_id);
      return res.status(200).json(unlike);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }
  async deleteComment(req, res) {
    try {
      const userId = req.user.id;
   
        const deleteComment = await RecipeService.deleteComment(
          req.params.comment_id
        );
        return res.status(200).json('Deleted Successfully');
 
  
   
    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal Server Error');
    }
  }
}
module.exports = new RecipeController();
