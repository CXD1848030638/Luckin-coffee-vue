<template>
    <!-- 搜索框 -->
    <van-search shape="round" background="#fff" placeholder="请输入搜索关键词" readonly @click-input="goToSearch" />
    <!-- 侧边栏和商品展示 -->
    <div class="side-product">
        <!-- 侧边栏 -->
        <van-sidebar v-model="active" @change="changeType">
            <!-- 3.数据渲染 -->
            <van-sidebar-item v-for="item in productType" :key="item.id" :title="item.typeDesc" />
        </van-sidebar>
        <!-- 商品展示  2.1 直接当成标签名使用 -->
        <ProductList class="productlist" :list="products"></ProductList>
    </div>
</template>

<script setup>
// 1.1导入自定义组件
import ProductList from '../components/ProductList.vue'

import { ref } from 'vue';
import axiosInstance from '../utils/request';
// 导入路由方法
import { useRouter } from 'vue-router';
const router = useRouter()

const active = ref(0);


// 商品类型
const productType = ref([])

const products = ref([])

// 1.获取侧边栏数据
axiosInstance.get('/type', {}).then(res => {
    console.log('商品类型', res);
    // 2.保存数据（处理数据）
    // 创建一个数组，并手动添加热卖推荐到数组的最前面
    var arr = res.data.result;
    arr.unshift({
        id: 0,
        type: 'hot',
        typeDesc: "热卖推荐"
    })
    console.log(arr);
    productType.value = arr
})

// 请求商品展示
function getProduct(key, value) {
    axiosInstance.get("/typeProducts", {
            params: {
                key: key,
                value: value,
            },
        })
        .then(function (response) {
            // 获取数据成功之后
            console.log("获取热门商品", response.data.result);

            // // 修改状态
            products.value = response.data.result;
        });
}

getProduct('isHot', '1')

// 点击sidebar 切换不同数据
function changeType(index) {
    console.log(productType.value[index].type);
    // 判断点击的是否是热卖推荐
    if (index == 0) {
        getProduct('isHot', '1')
    } else {
        getProduct('type', productType.value[index].type)
    }
}

function goToSearch() {
    console.log("goToSearch该函数用于跳转到搜索页面");
    router.push({ path: "/search" });
}

</script>
<style scoped>
.side-product {
    display: flex;
}

.van-sidebar {
    --van-sidebar-width: 24%;
}
.productlist {
    height: 600px;
    overflow-y: auto;
}

</style>