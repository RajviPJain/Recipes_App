const db = require("../config/db");
const recipe = require("../models/recipe");
var Recipe = db.recipe;
var recipe_ingredients_qty = db.recipe_ingredient_qty;
var Ingredients = db.ingredient;
var like = db.Like;
var Ingredient_quantity = db.recipe_ingredient_qty;
var Sequelize = db.Sequelize;

class UserRecipeRepository {
  async postRecipes(recipedata, userId) {
    const recipe = await Recipe.create({
      title: recipedata.title || null,
      description: recipedata.description || null,
      user_id: userId,
      category_id: recipedata.category_id || null,
      duration: recipedata.duration || null,
      serving: recipedata.serving || null,
      image_url: recipedata.imageurl || null,
    });

    console.log(recipe.id);
    const ingredientsArray = Object.keys(recipedata.ingredients);
    console.log(ingredientsArray);

    // const quantityArray = Object.values(recipedata.ingredients);
    // console.log(quantityArray)

    const createdIngredients = [];
    for (const name of ingredientsArray) {
      const ingredient = await Ingredients.findOrCreate({
        where: { name },
      });

      createdIngredients.push(ingredient);
    }

    const result = createdIngredients.map((item) => {
      const quantity = recipedata.ingredients[item[0].name];

      return { ingredient_id: item[0].id, quantity, recipe_id: recipe.id };
    });

    const recipe_ingredient_quantity = await recipe_ingredients_qty.bulkCreate(
      result
    );
    return { recipe, createdIngredients, recipe_ingredient_quantity };
  }
  async updateRecipe(recipe_id, recipe_details) {
    const updatedRecipe = await Recipe.update(
      {
        title: recipe_details.title,
        description: recipe_details.description,
        category_id: recipe_details.category_id,
        duration: recipe_details.duration,
        serving: recipe_details.serving,
        image_url: recipe_details.image_url,
      },
      {
        where: {
          id: recipe_id,
        },
      }
    );
    return updatedRecipe;
  }
  async deleteRecipe(recipe_id) {
    const deletedRecipe = await Recipe.destroy({
      where: {
        id: recipe_id,
      },
    });
    return deletedRecipe;
  }

  async getUserLikedRecipe(user_id) {
    const userLiked = await like.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        userId: user_id,
      },
    });

    return userLiked;
  }

  async deleteIngredient(id) {
    const deleteIngredient = await Ingredient_quantity.destroy({
      where: {
        id,
      },
    });

    return deleteIngredient;
  }

  async updateIngredient(ingredient, recipe_id) {
    // console.log(ingredient.quantity,recipe_id)
    const findCreateIngredient = await Ingredients.findOrCreate({
      where: { name: ingredient.name },
    });
   
    const updateQuantity = await Ingredient_quantity.update(
      {
        quantity: ingredient.quantity,
      },
      {
        where: {
          recipe_id,
          ingredient_id:ingredient.id
        },
      }
    );

    return updateQuantity
  }

  async addIngredient(ingredient, recipe_id) {
    const findCreateIngredient = await Ingredients.findOrCreate({
      where: { name: ingredient.name },
    });
  
    const addQuantity = await Ingredient_quantity.create({
      recipe_id,
      quantity: ingredient.quantity,
      ingredient_id: findCreateIngredient[0].id,
    });

    return addQuantity;
  }
}

module.exports = new UserRecipeRepository();
