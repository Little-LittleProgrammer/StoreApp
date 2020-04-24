import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userName: ''

  },
  getters: {
    getUserName: function (state) {
      return state.userName
    }
  },
  mutations: {
    changeUserName (state, userName) {
      state.userName = userName
    }
  },
  actions: {
    changeUserName (context, userName) {
      context.commit('changeUserName', userName)
    }
  }
})

export default store
