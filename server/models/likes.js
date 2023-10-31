
module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define(
      "like",
      { 
        userId:{
            type:DataTypes.BIGINT,
               
       
        },
        recipeId:{
            type:DataTypes.BIGINT,
        
        }
      },
      {
        indexes: [
          {
            unique: true,
            fields: ["userId", "recipeId"],
          },
        ],
      },
      
      { tablename: "likes" },
      {
        // Define a custom validation to check that key1 and key2 are different
        validate: {
          checkKeysAreDifferent() {
            if (this.userId === this.recipeId) {
              throw new Error('key1 and key2 must be different');
            }
          },
        },
      }
      
    );

    return Like;
  };