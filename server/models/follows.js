const User = require("./user");

module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    "follow",
    {
      followeeId: {
        type: DataTypes.BIGINT,
      },
      followerId: {
        type: DataTypes.BIGINT,
      },
    },
    {
      // Define the unique constraint for the combination of followeeId and followerId
      indexes: [
        {
          unique: true,
          fields: ["followeeId", "followerId"],
        },
      ],
      tableName: "follows", // Corrected the table name definition
      validate: {
        checkKeysAreDifferent() {
          if (this.followerId === this.followeeId) {
            console.log("erID:", this.followerId, "eeID: ", this.followeeId);
            throw new Error("followerId and followeeId must be different");
          }
        },
      },
    }
  );

  return Follow;
};
