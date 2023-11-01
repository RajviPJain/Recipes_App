const db = require("../config/db");
const { Op } = require("sequelize");
var Recipe = db.recipe;
var Category = db.category;
var User = db.user;
var Like = db.Like;
var Ingredients_qty = db.recipe_ingredient_qty;
var Ingredients = db.ingredient;
var Comments = db.Comment;
var Category = db.category;
var follow=db.Follow

class RecipesRepository {
  async getRecipes(query) {
    console.log(query)
    
    const search = query.search || "";
    const page=query.page
    // console.log(search);
    const recipes = await Recipe.findAndCountAll({
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
        ],
        include: [
          [
            db.sequelize.literal(
              `(SELECT COUNT(*) FROM "likes" WHERE "likes"."recipeId" = "recipe"."id")`
            ),
            "likeCount",
          ],
          [
            db.sequelize.literal(
              `(SELECT COUNT(*) FROM "comments" WHERE "comments"."recipeId" = "recipe"."id")`
            ),
            "commentsCount",
          ],
        ],
      },
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            duration: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      include: [
        {
          model: User,
          attributes: ["username", "imageurl"],
          // where:{
          //     [Op.or]: [
          //         {
          //           username: {
          //             [Op.like]: `%${search}%`,
          //           },
          //         },
          //     ]
          // }
        },
        {
          model: Ingredients_qty,
          attributes: ["quantity"],
          include: [
            {
              model: Ingredients,
              attributes: ["id", "name", "image_url"],
              where: {
                [Op.or]: [
                  {
                    name: {
                      [Op.like]: `%${search}%`,
                    },
                  },
                ],
              },
            },
          ],
        },
        {
          model: Category,
          attributes: ["id", "name"],
          // where:{
          //     [Op.or]: [
          //         {
          //           name: {
          //             [Op.like]: `%${search}%`,
          //           },
          //         },
          //     ]
          // }
        },
      ],
      limit:9,
      offset: page ? (page - 1) * 9 : 0,
    });

    const recipeCount = await Recipe.count();

    

    return {recipes,recipeCount};
  }

  async getCategories(){
 
    const categories = await Category.findAll();
    return categories
  }

  async getRecipe(id) {
    const recipe = await Recipe.findOne({
      attributes: [
        "id",
        "title",
        "description",
        "user_id",
        "category_id",
        "image_url",
        "duration",
        "serving",
      ],
      where: {
        id: id,
      },
      include: [
        {
          model: User,
          attributes: ["username", "imageurl"],
        },
        {
          model: Ingredients_qty,
          attributes: ["id","quantity"],
          include: [
            {
              model: Ingredients,
              attributes: ["id", "name", "image_url"],
            },
          ],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });

    const likesCount = await Like.count({
      where: {
        recipeId: id,
      },
    });

    const commentsCount = await Comments.count({
      where: {
        recipeId: id,
      },
    });


    return { recipe, likesCount, commentsCount};
  }

  async getRecipesByCategories(id,page) {
    console.log
    const recipes = await Recipe.findAndCountAll({
      attributes: {
        include: [
          "id",
          "title",
          "description",
          "user_id",
          "category_id",
          "image_url",
          "duration",
          "serving",
        ],
        include: [
          [
            db.sequelize.literal(
              `(SELECT COUNT(*) FROM "likes" WHERE "likes"."recipeId" = "recipe"."id")`
            ),
            "likeCount",
          ],
          [
            db.sequelize.literal(
              `(SELECT COUNT(*) FROM "comments" WHERE "comments"."recipeId" = "recipe"."id")`
            ),
            "commentsCount",
          ],
        ],
      },
      where: {
        category_id: id,
      },
      include: [
        {
          model: User,
          attributes: ["username", "imageurl"],
        },
        {
          model: Ingredients_qty,
          attributes: ["quantity"],
          include: [
            {
              model: Ingredients,
              attributes: ["id", "name", "image_url"],
            },
          ],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
      limit:9,
      offset: page ? (page - 1) * 9 : 0,
    });

    const recipeCount = await Recipe.count({
       where:{
        category_id: id,
       }
    });

    return {recipes,recipeCount};
  }

  async getUserRecipes(id,userId) {
 
    const recipes = await Recipe.findAndCountAll({
      attributes: {
        include: [
          "id",
          "title",
          "description",
          "user_id",
          "category_id",
          "image_url",
          "duration",
          "serving",
        ],
        include: [
          [
            db.sequelize.literal(
              `(SELECT COUNT(*) FROM "likes" WHERE "likes"."recipeId" = "recipe"."id")`
            ),
            "likeCount",
          ],
          [
            db.sequelize.literal(
              `(SELECT COUNT(*) FROM "comments" WHERE "comments"."recipeId" = "recipe"."id")`
            ),
            "commentsCount",
          ],
        ],
      },
      where: {
        user_id: id,
      },
      include: [
        {
          model: User,
          attributes: ["username", "imageurl"],
        },
        {
          model: Ingredients_qty,
          attributes: ["quantity"],
          include: [
            {
              model: Ingredients,
              attributes: ["id", "name", "image_url"],
            },
          ],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    });

    const followerCount=await follow.count({
      where:{
        followeeId:id
      }
    })

    const followingCount=await follow.count({
      where:{
        followerId:id
      }

 
    })
    const Following=await follow.findAll({
      where:{
        followerId:userId,
        followeeId:id
      } 
    })
    
    let isFollowing=true
    if(Following.length===0){
       isFollowing=false
    }



    return {recipes,followerCount,followingCount,isFollowing };
  }

  async getLikeUsers(id) {
    const UsersLikes = await Like.findAll({
      attributes: ["id", "recipeId", "userId"],
      where: {
        recipeId: id,
      },
      include: [
        {
          model: User,
          attributes: ["username", "imageurl"],
        },
      ],
    });

    return UsersLikes;
  }

  async getComments(id) {
    console.log(id);
    const comments = await Comments.findAll({
      attributes: ["id", "recipeId", "userId", "comment"],
      where: {
        recipeId: id,
      },
      include: [
        {
          model: User,
          attributes: ["username", "imageurl"],
        },
      ],
    });

    return comments;
  }

  async postLikes(userId, recipeId) {
    const Liked = await Like.findOne({
      where: {
        userId,
        recipeId,
      },
    });

    if (Liked !== null) {
      return "Already liked";
    }
    const like = await Like.create({
      userId,
      recipeId,
    });

    return like;
  }

  async postComments(userId, recipeId, usercomment) {
    const comment = await Comments.create({
      userId,
      recipeId,
      comment: usercomment,
    });

    return comment;
  }

  async unlike(userId, recipeId) {
    const liked = await Like.findAll({
      where: { userId, recipeId },
    });

    if (liked.length === 0) {
      return "Not liked";
    }
    const unlike = await Like.destroy({
      where: {
        userId,
        recipeId,
      },
    });

    return unlike;
  }


  async deleteComment(id) {
    const deleteComment = await Comments.destroy({
      where: {
        id,
      },
    });

    return deleteComment;
  }
}
module.exports = new RecipesRepository();
