import myAxios from '../axios'
// 获取二级导航内容
function getSideNavList (type) {
  return myAxios.get('/getsidebar', {
    params: {
      type
    }
  })
}
// 获取商品列表信息 /getGoodsList
function getGoodsList (type, page, size, sort) {
  return myAxios.get('/getGoodsList', {
    params: {
      type,
      page,
      size,
      sort
    }
  })
}
// 模糊搜索
function getSearchResult (value) {
  return myAxios.get('/likeSearch', {
    params: {
      likeValue: value
    }
  })
}
// 搜索
function getSearchList (type, page, size) {
  return myAxios.get('/search', {
    params: {
      type,
      page,
      size
    }
  })
}
// 购物车页通过id获取商品列表
function getGoodsListById (value) {
  return myAxios.get('/getGoodsByIds', {
    params: {
      value
    }
  })
}
export default {
  getSideNavList,
  getGoodsList,
  getSearchResult,
  getSearchList,
  getGoodsListById
}
