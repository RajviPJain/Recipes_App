const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.URL, { logging: false });
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user")(sequelize, DataTypes);
db.Notification = require("../models/notification")(sequelize, DataTypes);
db.Comment = require("../models/comment")(sequelize, DataTypes);
db.Follow = require("../models/follows")(sequelize, DataTypes);
db.Like = require("../models/likes")(sequelize, DataTypes);
db.recipe = require("../models/recipe")(sequelize, DataTypes);
db.ingredient = require("../models/ingredient")(sequelize, DataTypes);
db.recipe_ingredient_qty = require("../models/recipe_ingredient_qty")(
  sequelize,
  DataTypes
);
db.category = require("../models/category")(sequelize, DataTypes);

db.user.hasMany(db.recipe, {
  foreignKey: "user_id",
  sourceKey: "id",
});
db.recipe.belongsTo(db.user, {
  foreignKey: "user_id",
  sourceKey: "id",
});

db.category.hasMany(db.recipe, {
  foreignKey: "category_id",
  sourceKey: "id",
});
db.recipe.belongsTo(db.category, {
  foreignKey: "category_id",
  sourceKey: "id",
});

db.recipe.hasMany(db.recipe_ingredient_qty, {
  foreignKey: "recipe_id",
  sourceKey: "id",
});
db.recipe_ingredient_qty.belongsTo(db.recipe, {
  foreignKey: "recipe_id",
  sourceKey: "id",
});
db.ingredient.hasMany(db.recipe_ingredient_qty, {
  foreignKey: "ingredient_id",
  sourceKey: "id",
});
db.recipe_ingredient_qty.belongsTo(db.ingredient, {
  foreignKey: "ingredient_id",
  sourceKey: "id",
});

db.user.hasMany(db.Notification, {
  foreignKey: "source_id",
  sourceKey: "id",
});

db.user.hasMany(db.Notification, {
  foreignKey: "user_id",
  sourceKey: "id",
});

db.Notification.belongsTo(db.user, {
  foreignKey: "source_id",
  sourceKey: "id",
});

db.Notification.belongsTo(db.user, {
  foreignKey: "user_id",
  sourceKey: "id",
});

db.user.hasMany(db.Comment);
db.Comment.belongsTo(db.user);

db.recipe.hasMany(db.Comment);
db.Comment.belongsTo(db.recipe);


db.user.hasMany(db.Follow, {
  foreignKey: "followeeId",
  sourceKey: "id",
});

db.user.hasMany(db.Follow, {
  foreignKey: "followerId",
  sourceKey: "id",
});

db.Follow.belongsTo(db.user, {
  foreignKey: "followeeId",
  sourceKey: "id",
});

db.Follow.belongsTo(db.user, {
  foreignKey: "followerId",
  sourceKey: "id",
});

db.user.hasMany(db.Like);
db.Like.belongsTo(db.user);

db.recipe.hasMany(db.Like);
db.Like.belongsTo(db.recipe)

// db.Follow.sync({force:true})
db.sequelize.sync({ force: false });
module.exports = db;
