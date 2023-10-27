module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "user",
      { firstname:{
          type:DataTypes.STRING(30),
          allowNull:false
      },
        lastname:{
            type:DataTypes.STRING(30),
        },
        username:{
           type:DataTypes.STRING(20),
           unique:true,
           allowNull: false,
        },
        email: {
          type: DataTypes.STRING(50),
          unique: true,
          validate: {
            isEmail: true,
            notEmpty: true,
          },
        },
  
        password: {
          type: DataTypes.STRING(64),
        },
        about:{
            type:DataTypes.TEXT
        },
        imageurl:{
            type:DataTypes.TEXT
        }
      },
      { tablename: "users" }
    );
  
    return User;
  };