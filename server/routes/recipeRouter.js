const express = require("express");
const RecipeController = require("../controllers/recipeController");

const recipeRouter = express.Router();
const isAuthenticated = require("../middleware/isAuth");

//get recipes requests
recipeRouter.get("/category",RecipeController.getCategories)
recipeRouter.get("/:recipe_id", RecipeController.getRecipe); //to get a particular recipe

recipeRouter.get("/", RecipeController.getAllRecipe); //to get all recipes//http://localhost:3000/recipe?search=
recipeRouter.get("/user/:user_id",isAuthenticated, RecipeController.getUserRecipe); //to get particular user recipe for  other users


//likes
recipeRouter.get("/:recipe_id/likes", RecipeController.getLikeUsers); //to get all likes of particular recipe
recipeRouter.post("/:recipe_id/like",isAuthenticated, RecipeController.postLike); //to like a recipe
recipeRouter.delete("/:recipe_id/unlike",isAuthenticated, RecipeController.unlike); //to unlike a recipe

// //comments
recipeRouter.get("/:recipe_id/comments", RecipeController.getComment); //to get all comments of a particular recipe
recipeRouter.post("/:recipe_id/comment",isAuthenticated, RecipeController.postComment); //to post a comment on particular recipe
recipeRouter.delete("/:comment_id",isAuthenticated, RecipeController.deleteComment); //to delete a particular comment


recipeRouter.get(
  "/category/:category_id",
  RecipeController.getRecipeByCategory
); //to get recipes of particular category
// recipeRouter.use(require("../middlewares/authMiddleware").verifyToken);
//categorywiseroute

module.exports = recipeRouter;
