const RecipesRepository=require('../repository/recipesRepository')

class RecipeService{
      async getRecipes(query){
          const recipesDetails=RecipesRepository.getRecipes(query)

          return recipesDetails
      }

      async getRecipe(id){
       
         const recipeDetail= await RecipesRepository.getRecipe(id)
         return recipeDetail
      }

      async getCategories(){
        
        const categories=await RecipesRepository.getCategories()
        return categories
      }

      async getRecipeByCategory(id){
        const recipeDetail= await RecipesRepository.getRecipesByCategories(id)
        return recipeDetail
      }

      async getUserRecipes(id){
        const recipeDetail= await RecipesRepository.getUserRecipes(id)
      
        return recipeDetail
      }

      async getLikeUsers(id){
        const Users=await RecipesRepository.getLikeUsers(id)
        return Users
      }

      async postLikes(userId,recipeId){
        const like=await RecipesRepository.postLikes(userId,recipeId)
        return like
      }

      async getComments(id){
        const comments=await RecipesRepository.getComments(id)
        return comments
      }

      async postComments(userId,recipeId,usercomment){
        const comment=await RecipesRepository.postComments(userId,recipeId,usercomment)
        return comment
      }

      async unlike(userId,recipeId){
        const like=await RecipesRepository.unlike(userId,recipeId)
        return like
      }

      async deleteComment(commentId){
        const deleteComment=await RecipesRepository.deleteComment(commentId)
        return deleteComment
      }
}

module.exports=new RecipeService()