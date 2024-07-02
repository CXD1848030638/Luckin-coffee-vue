<script setup>
import { RouterView } from 'vue-router'
// 监听路由参数，不是页面跳转！！！页面跳转是UseRouter
import { useRoute } from 'vue-router';
// import { computed } from 'vue';
const route = useRoute()

// const changecolor = computed(() => 
//   route.path !== '/login'
// );
</script>

<template>
  <header>
    <div class="wrapper" v-if="route.meta.isShowTabBar">
      <van-tabbar route>
        <van-tabbar-item to="/">
          <span>首页</span>
          <template #icon="props">
            <img :src="props.active ? 'Iconimg/home_active.png' : 'Iconimg/home.png'" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/menu">
          <span>菜单</span>
          <template #icon="props">
            <img :src="props.active ? 'Iconimg/menu_active.png' : 'Iconimg/menu.png'" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/cart">
          <span>购物袋</span>
          <template #icon="props">
            <img :src="props.active ? 'Iconimg/shopbag_active.png' : 'Iconimg/shopbag.png'" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/mine">
          <span>我的</span>
          <template #icon="props">
            <img :src="props.active ? 'Iconimg/my_active.png' : 'Iconimg/my.png'" />
          </template>
        </van-tabbar-item>
      </van-tabbar>

    </div>
  </header>

    <!-- 使用内置组件KeepAlive缓存组件状态 -->
    <!-- 参考文档: https://cn.vuejs.org/guide/built-ins/keep-alive.html -->
    <RouterView v-slot="{ Component }">
        <keep-alive include="MenuView,SearchView">
            <component :is="Component"></component>
        </keep-alive>
    </RouterView>
</template>

<style>
/* 隐藏浏览器自带的滚动条 */
body::-webkit-scrollbar {
  width: 0px; /* 调整滚动条宽度 */
  display: none;
}
body{
  background-color: #f5f5f5;
}

</style>
