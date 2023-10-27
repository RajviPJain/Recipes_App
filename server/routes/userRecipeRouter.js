const express = require("express");
const UserRecipeController = require("../controllers/userRecipeController");
const userRecipeRouter = express.Router();
const isAuthenticated = require("../middleware/isAuth");

//user-recipe use UserRecipeController
userRecipeRouter.get("/me/recipes",isAuthenticated, UserRecipeController.getRecipe); //to get my recipe
userRecipeRouter.post("/recipe",isAuthenticated, UserRecipeController.postRecipe); //to post a recipe
userRecipeRouter.patch("/:recipe_id",isAuthenticated, UserRecipeController.updateRecipe); //to update a recipe
userRecipeRouter.delete("/:recipe_id", isAuthenticated,UserRecipeController.deleteRecipe); //to delete a particular recipe
// userRouter.use(require("../middlewares/authMiddleware").verifyToken);
userRecipeRouter.get("/liked",isAuthenticated,UserRecipeController.userLikedRecipe)

userRecipeRouter.delete("/ingredient/:ingredient_id",isAuthenticated,UserRecipeController.deleteIngredient)
userRecipeRouter.patch("/:recipe_id/ingredient",isAuthenticated,UserRecipeController.updateIngredient)
userRecipeRouter.post("/:recipe_id/ingredient",isAuthenticated,UserRecipeController.addIngredient)
module.exports = userRecipeRouter;
