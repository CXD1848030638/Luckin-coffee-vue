<template>
  <!-- 顶部导航栏 -->
  <div class="top-nav">
        <div class="nav-left">
            <!-- 问候语 -->
            <div class="helloDesc">{{ greetings }}</div>
            <!-- 用户昵称 -->
            <div class="nickName">{{ nickName }}</div>
        </div>
        <!-- vant搜索框组件 参考文档: https://vant-ui.github.io/vant-weapp/#/search -->
        <van-search shape="round" background="#fff" placeholder="请输入搜索关键词" readonly @click-input="goToSearch" />
    </div>

  <!-- 轮播图 -->
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(banner, index) in banners" v-bind:key="index" @click="gotoProductDetail(banner.pid)">
      <img width="100%" v-bind:src="banner.bannerImg" alt="">
    </van-swipe-item>
  </van-swipe>

  <!-- 商品列表 -->
  <ul class="products">
    <li v-for="(p, index) in products" v-bind:key="index" @click="gotoProductDetail(p.pid)">
      <div class="thumb">
        <img :src="p.smallImg" alt="">
        <span v-if="p.isHot == 1">热门</span>
      </div>
      <div class="name">{{ p.name }}</div>
      <div class="enname">{{ p.enname }}</div>
      <div class="price">￥{{ p.price }}</div>
    </li>
  </ul>
</template>

<script setup>
import { ref, computed } from "vue";
// 导入useRouter
import { useRouter } from "vue-router";
import axiosInstance from '../utils/request';

const banners = ref([])
const products = ref([])

// 用户昵称
const nickName = ref("Allen");
// 小时数  默认值是0
const hours = ref(new Date().getHours());
// 得到router对象,主要用于跳转页面
const router = useRouter();

// 一个计算属性 ref
const greetings = computed(() => {
    // 判断当前时间的小时数
    if (hours.value >= 6 && hours.value < 12) {
        return "早上好";
    } else if (hours.value >= 12 && hours.value < 18) {
        return "下午好";
    } else if (hours.value >= 18 && hours.value < 24) {
        return "晚上好";
    } else {
        return "夜深了~";
    }
});

// 定义事件处理函数
function goToSearch() {
    router.push({ path: "/search" });
}

//获取轮播图
axiosInstance.get('/banner', {})
  .then(function (res) {
    // 获取数据成功之后 
    console.log("获取banner", res.data.result);
    // 修改状态
    banners.value = res.data.result
  })


// 获取热门商品
axiosInstance.get('/typeProducts', {
  params: {
    key: "isHot",
    value: 1
  }
})
  .then(function (res) {
    // 获取数据成功之后 
    console.log("获取热门商品", res.data.result);

    // 修改状态
    products.value = res.data.result
})

// 跳转到商品详情页面的事件处理函数
function gotoProductDetail(pid) {
    router.push({
        path: "/productDetail",
        // query属性设置的是跳转时, 传递的页面参数
        query: { pid: pid },
    });
}
</script>

<style scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin-bottom: 50px;
}
.products li {
  width: 49%;
  font-weight: 300;
}
.products li:nth-child(2n+1) {
  margin-right: 2%;

}
.products li .thumb {
  position: relative;
}
.products li .thumb img {
  width: 100%;
}
.products li .thumb span {
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  z-index: 0;
  /* width: 100px;
  height: 100px; */
  font-size: 12px;
  padding: 3px 5px;
  background-color: red;
}
.products li .enname {
  font-size: 12px;
  color: gray;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.products li .price {
  font-size: 14px;
  font-weight: bold;
  color: red;
  padding: 5px 0 10px 0;
}

/* 顶部导航栏样式开始 */
/* 顶部导航栏样式结束 */
.top-nav {
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    position: fixed;
    z-index: 9999;
    width: 100%;
    top: 0;
    left: 0;
}
.top-nav .nav-left {
    display: flex;
    align-items: center;
}
.top-nav .nav-left .helloDesc {
    color: #6a6867;
    font-weight: bold;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: -4px;
}
.top-nav .nav-left .nickName {
    font-weight: bold;
    color: #114ac0;
}

.my-swipe{
  margin-top: 56px;
}
</style>