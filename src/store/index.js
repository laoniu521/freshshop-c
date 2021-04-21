import Vue from 'vue'
import Vuex from 'vuex'
import production from '../api/production'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideNavList: [],
    isShow: false
  },
  mutations: {
    changeSideNavList (state, list) {
      state.sideNavList = list
      state.isShow = true
    }
  },
  actions: {
    async changeSideNavListAction ({
      commit,
      state
    }, type) {
      state.isShow = false
      const resultList = await production.getSideNavList(type)
      commit('changeSideNavList', resultList)
    }
  },
  modules: {}
})
