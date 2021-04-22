import Vue from 'vue'
import Vuex from 'vuex'
import production from '../api/production'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideNavList: [],
    isShow: false,
    goodsList: [],
    page: 1,
    size: 10,
    sort: 'all'
  },
  mutations: {
    changeSideNavList (state, list) {
      state.sideNavList = list
      state.isShow = true
    },
    changeGoodsList (state, list) {
      state.goodsList = list
    },
    changePage (state, value) {
      state.page = value
    },
    changeSize (state, value) {
      state.size = value
    },
    changeSort (state, value) {
      state.sort = value
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
    },
    async changeGoodsListAction ({
      commit,
      state
    }, type) {
      const resultList = await production.getGoodsList(type, state.page, state.size, state.sort)

      commit('changeGoodsList', resultList.list)
    }
  },
  modules: {}
})
