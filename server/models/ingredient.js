module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define(
    "ingredient",
    {
      
      name: {
        type: DataTypes.STRING,
      },
      image_url: {
        type: DataTypes.STRING,
      },
    },
    { tablename: "ingredients" }
  );

  return Ingredient;
};
