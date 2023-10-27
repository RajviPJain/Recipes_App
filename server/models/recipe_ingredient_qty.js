module.exports = (sequelize, DataTypes) => {
    const Recipe_ingredient_qty = sequelize.define(
      "recipe_ingredient_qty",
      {
        recipe_id: {
          type: DataTypes.INTEGER,
        },
       ingredient_id: {
          type: DataTypes.INTEGER,
        },
       quantity: {
          type: DataTypes.STRING,
        },
      },
      { tablename: "recipe_ingredient_qtys" }
    );
  
    return Recipe_ingredient_qty;
  };
  