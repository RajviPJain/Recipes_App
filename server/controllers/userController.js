const UserService = require("../services/userService");
class UserController{
   async register(req,res){
       try{
            const data=await UserService.registerUser(req.body.userdetails)
         
            // return res.status(200).json(data)
            const queryParams = new URLSearchParams();
        const encodedToken = encodeURIComponent(data);

        queryParams.append('token', encodedToken);

        const redirectUrlWithToken = `${'/users/localauth'}?${queryParams.toString()}`;
       
        res.redirect(redirectUrlWithToken);
       }
       catch(error){
        console.log(error);
        return res.status(500).json('Please Register');
       }
   }

   async login(req,res){
       try{
            const data=await UserService.login(req.body.userdetails)
           
            
            // return res.status(200).json(data)
            const queryParams = new URLSearchParams();
            const encodedToken = encodeURIComponent(data);
    
            queryParams.append('token', encodedToken);
    
            const redirectUrlWithToken = `${'/users/localauth'}?${queryParams.toString()}`;
           
            res.redirect(redirectUrlWithToken);
       }catch(error){
        return res.status(401).json('Invalid');
       }
   }

   async getUser(req,res){
       try{
           
            const userId=req.user.id
            const user=await UserService.getUser(userId)
            return res.status(200).json(user)
       }catch(error){
        console.log(error);
        return res.status(500).json({ error });
       }
   }
   async updateUser(){

   }

   async logout(req, res){
    try {
      req.logout(()=>{
        res.send('Logout')
      })
      
    } catch (e) {
      console.log(e);
      res.send("No token");
    }
  };
}
module.exports=new UserController()