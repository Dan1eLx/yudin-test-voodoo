import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    async GET_POSTS({commit}){
      const posts = await Axios('http://jsonplaceholder.typicode.com/posts').then(async (responsePosts) => {
        const promises = responsePosts.data.map(async post => {
            post.userName = await Axios('http://jsonplaceholder.typicode.com/users/' + post.userId).then((responseUsers) => {
            return responseUsers.data.name
          })
        })
        await Promise.all(promises);
        return responsePosts.data

      }).catch((error) => {
        console.log(error)
        return error
      })
      commit('SET_POSTS', posts)

      
      
    }
  },
  getters:{
    POSTS: s => s.posts
  },
  modules: {
  }
})
