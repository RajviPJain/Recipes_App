module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    { tablename: "categories" }
  );

  return Category;
};
