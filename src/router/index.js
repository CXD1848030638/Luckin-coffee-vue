import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import CartView from '../views/CartView.vue'
import MineView from '../views/MineView.vue'
import SearchView from '../views/SearchView.vue'
import LoginView from '../views/LoginView.vue'
import ProDetailView from '../views/ProductDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta:{
        isShowTabBar: true
      }
    },
    {
      path: '/menu',
      component: MenuView,
      meta:{
        isShowTabBar:true
      }
    },
    {
      path: '/cart',
      component: CartView,
      meta:{
        isShowTabBar:true
      }
    },
    {
      path: '/mine',
      component: MineView,
      meta:{
        isShowTabBar:true
      }
    },
    {
      path:'/search',
      component: SearchView,
      meta:{
        isShowTabBar:false
      }
    },
    {
      path:'/login',
      component: LoginView,
      meta:{
        isShowTabBar:false
      }
    },
    {
      path:'/productDetail',
      component: ProDetailView,
      meta:{
        isShowTabBar:false
      }
    },
    {
      path:'/MineInfo',
      component:()=> import('../views/Mine/InfoView.vue'),
      meta:{
        isShowTabBar:false
      }
    },
    {
      path:'/MineOrder',
      component:()=> import('../views/Mine/OrderView.vue'),
      meta:{
        isShowTabBar:false
      }
    },
    {
      path:'/MineLike',
      component:()=> import('../views/Mine/LikeView.vue'),
      meta:{
        isShowTabBar:false
      }
    },
    {
      path:'/MineAdreess',
      component:()=> import('../views/Mine/AddressView.vue'),
      meta:{
        isShowTabBar:false
      }
    },
    {
      path:'/MineSafe',
      component:()=> import('../views/Mine/SafeView.vue'),
      meta:{
        isShowTabBar:false
      }
    },
    {
      path:'/forgetpassword',
      component:()=> import('@/views/ForgetView.vue'),
      meta:{
        isShowTabBar:false
      }
    }
  ]
})

export default router
