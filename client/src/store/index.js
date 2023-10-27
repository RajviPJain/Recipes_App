
import { createStore } from 'vuex'
import categoryModule from './category'
import authModule from './authStore'

// Create a new store instance.
export default createStore({
  modules:{
    category:categoryModule,
    auth:authModule

  },
  state () {
    return {
     
    }
  },
  mutations: {

  }
})


