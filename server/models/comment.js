
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
      "comment",
      { comment:{
          type:DataTypes.TEXT,
         
      },
        recipeId:{
            type:DataTypes.INTEGER,   
       
        },
        userId:{
            type:DataTypes.INTEGER,
        
        }
      },
   
      { tablename: "comments" }
    );

    return Comment;
  };