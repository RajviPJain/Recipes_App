const db = require("../config/db");
var User = db.user;

class UserRepository {
  async getUser(userId) {
    const user = await User.findOne({
      attributes: {
        include: [
          [
            db.sequelize.literal(
              `(SELECT COUNT(*) FROM "follows" WHERE "follows"."followerId" = "user"."id")`
            ),
            "following",
          ],
          [
            db.sequelize.literal(
              `(SELECT COUNT(*) FROM "follows" WHERE "follows"."followeeId" = "user"."id")`
            ),
            "followers",
          ],
        ],
        exclude: ["password", "createdAt", "updatedAt"],
      },
      where: {
        id: userId,
      },
    });

    return user;
  }

  async findUserByEmail(userdata) {
    const user = await User.findAll({
      where: {
        email: userdata.email,
      },
    });

    return user;
  }

  async findUserByUsername(userdata) {
    const user = await User.findAll({
      where: {
        username: userdata.username,
      },
    });

    return user;
  }

  async registerUser(userdata) {
    const { firstname, lastname, email, password, about, username, imageurl } =
      userdata;

    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      about,
      username,
      imageurl,
    });

    return user;
  }

  async updateUser(userdata) {
    const { username, email, about, imageurl } = userdata;

    const user = await User.update(
      {
        username,
        email,
        about,
        imageurl,
      },
      {
        where: {
          id: userdata.id,
        },
      }
    );

    return user;
  }

  async updatePassword(newPassword, id) {
   
    const updatedPassword = await User.update(
      {
        password: newPassword,
      },
      {
        where: {
          id,
        },
      }
    );

    return updatedPassword
  }
}

module.exports = new UserRepository();
