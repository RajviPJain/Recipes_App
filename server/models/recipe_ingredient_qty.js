module.exports = (sequelize, DataTypes) => {
    const Recipe_ingredient_qty = sequelize.define(
      "recipe_ingredient_qty",
      {
        recipe_id: {
          type: DataTypes.BIGINT,
        },
       ingredient_id: {
          type: DataTypes.BIGINT,
        },
       quantity: {
          type: DataTypes.STRING,
        },
      },
      { tablename: "recipe_ingredient_qtys" }
    );
  
    return Recipe_ingredient_qty;
  };
  