const db = require("../config/db");
var User=db.user

class UserRepository{
   async getUser(userId){
     const user=await User.findOne({
        attributes:{       
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
            ],],
            exclude: ['password','createdAt','updatedAt'],
        },  
        where:{
            id:userId
        }
     })

     return user
   }

   async findUserByEmail(userdata){
    const user=await User.findAll({
     
      where:{
        email:userdata.email
      }
     })
    
     return user
   }

   async findUserByUsername(userdata){
   
      const user=await User.findAll({
        where:{
          username:userdata.username
        }
      })

      return user
   }

   async registerUser(userdata){
        const {firstname,lastname,email,password,about,username,imageurl}=userdata
        
        const user=await User.create({
             firstname,lastname,email,password,about,username,imageurl
        })
      
       return user
   }
}

module.exports=new UserRepository()