import myAxios from '../axios'

function getSideNavList (type) {
  return myAxios.get('/getsidebar', {
    params: {
      type
    }
  })
}
export default {
  getSideNavList
}
