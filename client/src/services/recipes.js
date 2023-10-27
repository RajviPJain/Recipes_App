import api from './api'

export default{
    getRecipes(){
        return api.get(`/recipe`)
    },
    searchRecipes(search){
        return api.get(`/recipe?search=${search}`)
    },

    getRecipedetails(id){
        return api.get(`recipe/${id}`)
    },

    getComments(id){
        return api.get(`recipe/${id}/comments`)
    },
    getUserRecipes(userId){
        return api.get(`recipe/user/${userId}`)
    },
    getCategories(){
        return api.get('recipe/category')
    },
    getRecipesByCategory(categoryId){
        return api.get(`recipe/category/${categoryId}`)
    }
}