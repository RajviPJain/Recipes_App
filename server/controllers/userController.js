const UserService = require("../services/userService");
class UserController {
  async register(req, res,next) {
    try {
      const data = await UserService.registerUser(req.body.userdetails);

      // return res.status(200).json(data)
      const queryParams = new URLSearchParams();
      const encodedToken = encodeURIComponent(data);

      queryParams.append("token", encodedToken);

      const redirectUrlWithToken = `${"/users/localauth"}?${queryParams.toString()}`;

      res.redirect(redirectUrlWithToken);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async login(req, res,next) {
    try {
      const data = await UserService.login(req.body.userdetails);

      // return res.status(200).json(data)
      const queryParams = new URLSearchParams();
      const encodedToken = encodeURIComponent(data);

      queryParams.append("token", encodedToken);

      const redirectUrlWithToken = `${"/users/localauth"}?${queryParams.toString()}`;

      res.redirect(redirectUrlWithToken);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res,next) {
    try {
      console.log('Req',req.user)
      const userId = req.user.id;
      const user = await UserService.getUser(userId);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async updateUser(req, res,next) {
    try {
      const user = await UserService.updateUser(req.body.userdata);
      return res.status(200).json("Updated Successfully");
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req, res,next) {
    try {
   
      const updatedPassword = await UserService.updatePassword(req.body.userdata);
      return res.status(200).json("Updated Successfully");
    } catch (error) {
      next(error);
    }
  }

  async verifyPassword(req,res,next){
     try{ 
        
        console.log('Inside Controller')
        const verifyPassword=await UserService.verifyPassword(req.body.userdata)
        console.log(verifyPassword)
        return res.status(200).json(verifyPassword);
     }
     catch(error){
      console.log("error",error.message)
      next(error);
     }
  }

  async logout(req, res,next) {
    try {
      req.logout(() => {
        res.send("Logout");
      });
    } catch (e) {
      console.log(e);
      next(error);
    }
  }
}
module.exports = new UserController();
