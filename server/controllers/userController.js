const UserService = require("../services/userService");
class UserController {
  async register(req, res) {
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
      return res.status(500).send(error.message);
    }
  }

  async login(req, res) {
    try {
      const data = await UserService.login(req.body.userdetails);

      // return res.status(200).json(data)
      const queryParams = new URLSearchParams();
      const encodedToken = encodeURIComponent(data);

      queryParams.append("token", encodedToken);

      const redirectUrlWithToken = `${"/users/localauth"}?${queryParams.toString()}`;

      res.redirect(redirectUrlWithToken);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async getUser(req, res) {
    try {
      console.log('Req',req.user)
      const userId = req.user.id;
      const user = await UserService.getUser(userId);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
  async updateUser(req, res) {
    try {
      const user = await UserService.updateUser(req.body.userdata);
      return res.status(200).json("Updated Successfully");
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async updatePassword(req, res) {
    try {
   
      const updatedPassword = await UserService.updatePassword(req.body.userdata);
      return res.status(200).json("Updated Successfully");
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async verifyPassword(req,res){
     try{ 
        
        console.log('Inside Controller')
        const verifyPassword=await UserService.verifyPassword(req.body.userdata)
        console.log(verifyPassword)
        return res.status(200).json(verifyPassword);
     }
     catch(error){
      console.log("error",error.message)
      return res.status(500).send(error.message);
     }
  }

  async logout(req, res) {
    try {
      req.logout(() => {
        res.send("Logout");
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("No token");
    }
  }
}
module.exports = new UserController();
