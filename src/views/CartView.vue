<template>
    <GoLogin v-if="!retrievedToken"></GoLogin>
    <div v-else>
        <!-- 顶部导航栏 -->
        <div class="cart-header">
            <van-nav-bar title="购物袋" left-text="返回" right-text="编辑" left-arrow @click-left="onClickLeft" @click-right="onClickRight" :fixed="true" :placeholder="true" />
        </div>
        <div class="cart-image"><img src="../../public/Iconimg/shopbag_bg.png" alt=""></div>
        <!-- 商品卡片 -->
        <div class="cartList"><CartList @update:checked="getcheckedAll" @updateTotalPrice="getTotalPrice" @updateCartLists="getCartLists" :list="cartLists" :ischecked="checkedAll" v-if="cartLists.length != 0"></CartList></div>
        <!-- 底部提交订单栏 -->
        <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit" style="margin-bottom:49px;">
            <van-checkbox v-model="checkedAll" checked-color="#0c34ba">全选</van-checkbox>
            <!-- <template #tip>
                你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
            </template> -->
        </van-submit-bar>
    </div>
</template>

<script setup>
import GoLogin from '/src/components/GoLogin.vue';
import CartList from '/src/components/CartList.vue'
import axiosInstance from '../utils/request';
import { onMounted, ref } from 'vue'
import { showToast } from 'vant';

import { useRouter } from 'vue-router'
const router = useRouter()

// 判断用户是否登录
const retrievedToken = localStorage.getItem('token');

//返回上一页面
const onClickLeft = () =>{
    history.back()
}

//编辑按钮
const onClickRight = () =>{

}

//全选按钮
const checkedAll = ref(false)

//修改地址
// const onClickLink = () => {
//     console.log('修改地址')
// };

const cartLists = ref([])
//获取用户购物车数据
const getCartLists = () =>{
    axiosInstance.get('/findAllShopcart',{}).then(function(res){
        cartLists.value = res.data.result
    })
}

onMounted(()=>{
    getCartLists()
})

const getcheckedAll = (val)=>{
    checkedAll.value = val
}

//获取购物车选中的商品总价
const totalPrice = ref(0)
const getTotalPrice = (val)=>{
    console.log(val)
    // 乘以100来移除小数点
    totalPrice.value = val.value * 100;
}

//提交订单
const onSubmit = () => {
    if(totalPrice.value){
        router.push({
            path: "/ordersubmit"
        })
    }else{
        showToast('你还未选择要购买的商品！')
    }
};
</script>

<style scoped>
.cart-image img{
    width: 100%;
}
.cartList{
    /* overflow: auto;
    height: 440px; */
    margin-bottom: 110px;
}
.cartList::-webkit-scrollbar{
    display: none;
}
</style>