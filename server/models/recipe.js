module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define(
    "recipe",
    {
      
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.BIGINT,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
      image_url: {
        type: DataTypes.STRING,
      },
      duration: {
        type: DataTypes.STRING,
      },
      serving: {
        type: DataTypes.INTEGER,
      },
    },
    { tablename: "recipes" }
  );

  return Recipe;
};
