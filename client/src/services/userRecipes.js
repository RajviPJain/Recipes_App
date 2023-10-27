import api from './api'

export default{
     getMyRecipes(){
        return api.get(`usersrecipe/me/recipes`)
     },

     deleteRecipe(id){
        return api.delete(`usersrecipe/${id}`)
     },

     postRecipe(recipeDetails){
         return api.post('usersrecipe/recipe',recipeDetails)
     },

     updateRecipe(recipeId,recipeDetails){
        return api.patch(`usersrecipe/${recipeId}`,recipeDetails)
     },

     getuserLikedRecipes(){
         return api.get('usersrecipe/liked')
     },

     postLike(recipeId){
      return api.post(`recipe/${recipeId}/like`)
     },

     deleteLike(recipeId){
      return api.delete(`recipe/${recipeId}/unlike`)
     },
     postComment(recipeId,postComment){
      console.log(postComment)
      return api.post(`recipe/${recipeId}/comment`,postComment)
     },

     deleteIngredient(id){
        return api.delete(`usersrecipe/ingredient/${id}`)
     },

     addIngredient(recipeId,ingredientDetails){
        return api.post(`usersrecipe/${recipeId}/ingredient`,ingredientDetails)
     },

     updateIngredient(recipeId,ingredientDetails){
        return api.patch(`usersrecipe/${recipeId}/ingredient`,ingredientDetails)
     }
}