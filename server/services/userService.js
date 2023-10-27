const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

const UsersRepository=require('../repository/usersRepository')

class UserService{
      async getUser(userId){
        const user=await UsersRepository.getUser(userId)
        return user
      }
      async generateToken(id,username){
        console.log('Generated token')
        const token = jwt.sign(
          { id, username },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );
      
        return token
       }

      async registerUser(userdata){
  
        const existingUser=await UsersRepository.findUserByEmail(userdata)
        const existingUsername=await UsersRepository.findUserByUsername(userdata)
        if(existingUser.length!==0 || existingUsername.length!==0){
           throw new Error('User already exists')
        }
        
        const hashedpassword = await bcrypt.hash(userdata.password, 10);
        userdata.password=hashedpassword
       
        const user=await UsersRepository.registerUser(userdata)
        // console.log(user.id)
        const token=await this.generateToken(user.id,userdata.username)
       
        return token
      }

      async login(userdata){
        const user=await UsersRepository.findUserByEmail(userdata)
        if(user.length===0){
          throw new Error('Invalid credentials')
        }
        
        const hashedpassword=user[0].password
      
        const isMatch = await bcrypt.compare(userdata.password, hashedpassword);
        if(isMatch){
          const token=await this.generateToken(user[0].id,user[0].username)
          return token
        }
        else{
          throw new Error('Invalid credentials')
        }
       
        
      }
      
}

module.exports=new UserService()