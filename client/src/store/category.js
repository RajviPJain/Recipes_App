import recipeapi from '../services/recipes'

const counterModule={
    namespaced:true,
    
    state(){
        return{
            categories:[]
        }
    },

    mutations:{
          setCategories(state,categories){
              state.categories=categories
          }
    },

    actions:{
       async fetchCategories({commit}){
        try{  
             
             const response=await recipeapi.getCategories()
             commit('setCategories',response.data)
        }
        catch(error){
            console.log(error)
        }
       }
    },

    getters:{
        getCategories(state){
            return state.categories
        }
    }

}

export default counterModule