<template>
    <!-- 顶部导航栏 -->
    <div class="cart-header">
        <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" :placeholder="true" />
    </div>
    <div class="bgcolor">
        <div class="container">
            <div class="navTab">
                <router-link to="/MineOrder/orderall" class="order" active-class="orderactive">全部</router-link>
                <router-link to="/MineOrder/ordergoing" class="order" active-class="orderactive">进行中</router-link>
                <router-link to="/MineOrder/ordercompleted" class="order" active-class="orderactive">已完成</router-link>
            </div>
        </div>
    </div>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useRouter,useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()

onMounted(() => {
    // 检查当前路由是不是 "/orderall"，如果是，则重定向 
    if (route.path == '/MineOrder') {  
        router.replace('/MineOrder/orderall');
    }
})

//返回个人页面
const onClickLeft = () =>{
    router.push({ path: '/mine' })
}
</script>

<style scoped>
.bgcolor{
    background-color: #0c34ba;
    width: 100%;
    height: 100px;
    position: fixed;
    z-index: 1;
}
.container{
    width: 87%;
    /* height: 400px; */
    margin: 0 auto;
    background-color: #fff;
    margin-top: 70px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 0 10px;
}

.navTab{
    width: 100%;
    height: 46px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    user-select: none;
}
.order{
    width: 20%;
    text-align: center;
    height: 100%;
    line-height: 300%;
    color: #545454;
}
.orderactive{
    color: black;
    border-bottom: 3px solid #0c34ba;
}

.content{
    width: 92%;
    margin: 0 auto;
    margin-top: 130px;
    margin-bottom: 12px;
    /* background-color: #fff; */
    /* padding: 10px 12px; */
}
</style>