<template>
  <!-- 顶部导航栏 -->
  <div class="header-nav">
    <!-- 
        使用的是vant的navBar导航栏 参考文档: 
        https://vant-ui.github.io/vant/#/zh-CN/nav-bar
        -->
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
      <template #title>
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </template>
    </van-nav-bar>

    <div class="historysTab">
        <div>搜索历史</div>
        <div @click="deleteAllHistory">清除所有历史记录</div>
    </div>
    <ul class="historys">
      <li v-for="(h, i) in searchHistorys" :key="i" @click="onSearch(h)">
        {{ h }} <span @click="deleteHistory(h)">×</span>
      </li>
    </ul>


    <div class="bg" style="background-color: #eee; margin-top: 20px;">
      <!-- 商品列表部分 -->
      <ul class="products">
        <li v-for="(p, index) in products" v-bind:key="index" @click="gotoProductDetail(p.pid)">
          <div class="thumb">
            <img :src="p.smallImg" alt="" />
            <span>热门</span>
          </div>
          <div class="name">{{ p.name }}</div>
          <div class="enname">{{ p.enname }}</div>
          <div class="price">￥{{ p.price }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { showToast } from "vant";
import axiosInstance from '../utils/request';

// 点击返回
const onClickLeft = () => history.back();

// search框绑定的值
const value = ref("");

const products = ref([]);

// 从本地存储获取默认值 不存在取[]
const searchHistorys = ref(
  JSON.parse(localStorage.getItem("searchHistorys")) || []
);

// 删除一个
const deleteHistory = (h) => {
  // console.log(h);
  // var arr = [11,22,33]
  // var x = arr.filter(o=> o!== 22) 使用js数组方法 filter过滤掉 相等的

  searchHistorys.value = searchHistorys.value.filter((o) => o !== h);

  // 删除的时候也同步一下本地存储 （增加删除两个地方都要操作本地存储 可以使用【侦听器】简写）
  localStorage.setItem("searchHistorys", JSON.stringify(searchHistorys.value));
};

// 删除所有
const deleteAllHistory = () => {
  searchHistorys.value = [];
  localStorage.setItem("searchHistorys", JSON.stringify(searchHistorys.value));
};

// 当搜索的时候
const onSearch = (val) => {
  // console.log(val);
  if (val) {
    // var x = new Set([1,2,3,1]) Set数据结构去重之后的数组
    // 新的 插入到头部 在去重
    searchHistorys.value = [...new Set([val, ...searchHistorys.value])];

    // 把searchHistorys存储到 本地存储的localstorage 持久化存储
    // localStorage.setItem('name','nick') 设置本地存储
    // localStorage.getItem('name')  读取本次存储
    // 设置的时候值是字符串 读取出来的也是字符串
    localStorage.setItem(
      "searchHistorys",
      JSON.stringify(searchHistorys.value)
    );
    axiosInstance.get("/search", {
        params: {
          name: val,
        },
      })
      .then(function (res) {
        // 获取数据成功之后
        console.log("获取搜索商品", res.data.result);

        // 修改状态
        products.value = res.data.result;
      });
  } else {
    products.value = [];
  }
};

import { useRouter } from "vue-router";
const router = useRouter();
// 跳转到商品详情页面的事件处理函数
const gotoProductDetail = (pid) =>{
  router.push({
    path:'/productDetail',
    query:{pid:pid}
  })
}

const onCancel = () => showToast("取消");
</script>

<style>
.header-nav .van-nav-bar__title {
  max-width: 80%;
  margin-left: 20%;
  margin-right: 0;
}

.historys {
  /* background-color: lightblue; */
  overflow: hidden;
  margin-top: 10px;
  padding: 10px;
}

.historys li {
  background-color: rgb(231, 231, 231);
  float: left;
  margin: 5px;
  line-height: 2em;
  padding: 0 10px;
  font-size: 12px;
}

/*  */

.products {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  background-color: #fff;
  /* margin-bottom: 50px; */
}

.products li {
  width: 49%;
  font-weight: 300;
}

.products li:nth-child(2n + 1) {
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
  z-index: 9;
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

.historysTab{
    display: flex;
    justify-content: space-between;
    margin: 8px 16px -14px 16px;
    font-size: 15px;
}
.historysTab div:nth-child(2){
    color: #999da4;
    cursor: pointer;
}
</style>
