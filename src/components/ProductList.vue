// 自定义组件
<template>
    <div class="product-list">
        <ul class="products">
            <li v-for="(p, index) in props.list" v-bind:key="index" @click="gotoProductDetail(p.pid)">
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
</template>
<script setup>
// 父组件传值子组件
// 1. 声明自定义属性
const props = defineProps(['list'])

import { useRouter } from "vue-router";
const router = useRouter();
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
.product-list{
    width: 76%;
}
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
</style>