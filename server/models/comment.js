
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
      "comment",
      { comment:{
          type:DataTypes.TEXT,
         
      },
        recipeId:{
            type:DataTypes.BIGINT,   
       
        },
        userId:{
            type:DataTypes.BIGINT,
        
        }
      },
   
      { tablename: "comments" }
    );

    return Comment;
  };