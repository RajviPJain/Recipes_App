import api from './api'

export default{
    getUser(){
        return api.get(`/users/me`)
    },
    getFollowers(){
        return api.get(`follows/follower`)
    },
    getFollowing(){
        return api.get(`follows/following`)
    },
    
    unfollow(id){
        return api.delete(`follows/${id}/unfollow`)
    },

    removeFollower(id){
        return api.delete(`follows/${id}/follower`)
    },

    follow(id){
        return api.post(`follows/${id}/follow`)
    },

    login(userdetails){
        return api.post(`users/login`,userdetails)
    },

    logout(){
        return api.get(`users/logout`)
    },

    registerUser(userdetails){
        return api.post(`users/register`,userdetails)
    }
}