import api from './api'

export default{
    getRecipes(page){
        return api.get(`/recipe?page=${page}`)
    },
    searchRecipes(search,page){
        return api.get(`/recipe?search=${search}&page=${page}`)
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
    getRecipesByCategory(categoryId,page){
        return api.get(`recipe/category/${categoryId}?page=${page}`)
    }
}