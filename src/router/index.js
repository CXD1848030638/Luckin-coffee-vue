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
        isShowTabBar: true,
        isLogin:false
      }
    },
    {
      path: '/menu',
      component: MenuView,
      meta:{
        isShowTabBar:true,
        isLogin:false
      }
    },
    {
      path: '/cart',
      component: CartView,
      meta:{
        isShowTabBar:true,
        isLogin:false
      }
    },
    {
      path: '/mine',
      component: MineView,
      meta:{
        isShowTabBar:true,
        isLogin:false
      }
    },
    {
      path:'/search',
      component: SearchView,
      meta:{
        isShowTabBar:false,
        isLogin:false
      }
    },
    {
      path:'/login',
      component: LoginView,
      meta:{
        isShowTabBar:false,
        isLogin:false
      }
    },
    {
      path:'/productDetail',
      component: ProDetailView,
      meta:{
        isShowTabBar:false,
        isLogin:true
      }
    },
    {
      path:'/MineInfo',
      component:()=> import('../views/Mine/InfoView.vue'),
      meta:{
        isShowTabBar:false,
        isLogin:true
      }
    },
    {
      path:'/MineOrder',
      component:()=> import('../views/Mine/OrderView.vue'),
      meta:{
        isShowTabBar:false,
        isLogin:true
      }
    },
    {
      path:'/MineLike',
      component:()=> import('../views/Mine/LikeView.vue'),
      meta:{
        isShowTabBar:false,
        isLogin:true
      }
    },
    {
      path:'/MineAdreess',
      component:()=> import('../views/Mine/AddressView.vue'),
      meta:{
        isShowTabBar:false,
        isLogin:true
      }
    },
    {
      path:'/MineSafe',
      component:()=> import('../views/Mine/SafeView.vue'),
      meta:{
        isShowTabBar:false,
        isLogin:true
      }
    },
    {
      path:'/forgetpassword',
      component:()=> import('@/views/ForgetView.vue'),
      meta:{
        isShowTabBar:false,
        isLogin:false
      }
    },
    {
      path:'/ordersubmit',
      component:()=> import(/* webpackChunkName:"SubmitView" */'@/views/SubmitView.vue'),
      meta:{
        isShowTabBar:false,
        isLogin:true
      }
    }
  ]
})

//全局路由前置守卫
// router.beforeEach((to,from,next) => {
//   if(to.meta.isLogin){
//     next('/login')
//   }else{
//     next()
//   }
// })

export default router
