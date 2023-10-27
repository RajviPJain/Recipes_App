const recipeRouter = require("./recipeRouter");
const userRouter = require("./userRouter");

const followsRouter = require("./followsRouter");
const userRecipeRouter = require("./userRecipeRouter");

const Routes = [
  { path: "/recipe", router: recipeRouter },
  { path: "/users", router: userRouter },
  { path: "/usersrecipe", router: userRecipeRouter },
  { path: "/follows", router: followsRouter },
];

module.exports = Routes;
