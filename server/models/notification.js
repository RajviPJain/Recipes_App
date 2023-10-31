
const User = require('./user');
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define(
      "notification",
      { content:{
          type:DataTypes.TEXT,
         
      },
        user_id:{
            type:DataTypes.BIGINT,   
       
        },
        source_id:{
            type:DataTypes.BIGINT,
        
        }
      },
      {
        indexes: [
          {
            unique: true,
            fields: ["user_id", "source_id"],
          },
        ],
      },
      { tablename: "notifications" }
    );

    return Notification;
  };