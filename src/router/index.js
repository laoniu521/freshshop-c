import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: () =>
    import('../views/Goods.vue')
},
{
  path: '/cart',
  component: () =>
    import('../views/Carts.vue')
},
{
  path: '/search',
  component: () =>
    import('../views/Search.vue')
}
]

const router = new VueRouter({
  routes
})

export default router
