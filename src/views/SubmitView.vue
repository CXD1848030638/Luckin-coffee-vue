<template>
    <div>
        <!-- 顶部导航栏 -->
        <div class="cart-header">
            <van-nav-bar title="订单结算" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" :placeholder="true" />
        </div>
        <div class="choiceAddress">
            <div>选择地址<van-icon name="arrow" /></div>
            <div class="addressNav">
                <div class="addressInfo">
                    <div>康刘用</div>
                    <div>13212312321</div>
                    <div>默认</div>
                </div>
                <div class="address">广东省东莞市寮步镇东莞城市学院菜鸟驿站</div>
            </div>
        </div>
        <div class="orderInfo">
            <div class="ordertext">订单信息</div>
            <div class="orderScroll">
                <OrderList :list="orderlist"></OrderList>
            </div>
        </div>
        <div class="orderCount">
            <div>共计 {{ computedCount }} 件商品</div>
            <div>订单金额：￥{{ computedPrice }}</div>
        </div>
        <div class="submitButton" @click="orderSubmit"><van-button type="primary" round block color="#0c34ba">立即结算</van-button></div>
    </div>
</template>
    
<script setup>
//引入自定义组件OrderList
import OrderList from '@/components/OrderList.vue'
import { ref,computed } from 'vue'

//引入pinia，并初始化一个实例对象
import { useCounterStore } from '@/stores/counter';
const piniaStore = useCounterStore()

//从pinia中获取购物车提交到结算页面的数据
const orderlist = ref(piniaStore.cartsList.filter(order =>{
    return order.checked === true
}))

//计算商品总数
const computedCount = computed(() =>{
    let countsum = 0;
    orderlist.value.forEach(order =>{
        countsum += order.count 
    })
    return countsum
})

//计算商品总价
const computedPrice = computed(() =>{
    let pricesum = 0;
    orderlist.value.forEach(order =>{
        pricesum += order.price * order.count 
    })
    return pricesum.toFixed(2)
})

//返回上一页面
const onClickLeft = () =>{
    history.back()
}

//立即结算
const orderSubmit = () =>{
    console.log(orderlist.value);
}
</script>
    
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.choiceAddress{
    background-color: #fff;
    width: 88%;
    margin: 10px auto;
    height: 85px;
    border-radius: 10px;
    padding: 12px 10px;
}
.addressNav{
    margin-top: 15px;
}
.addressInfo{
    display: flex;
}
.addressInfo div:nth-of-type(1){
    font-weight: 600;
    align-items: center;
}
.addressInfo div:nth-of-type(2){
    margin-left: 10px;
}
.addressInfo div:nth-of-type(3){
    margin-left: 10px;
    background-color: #0c34ba;
    color: #fff;
    width: 40px;
    text-align: center;
    border-radius: 50px;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
}
.address{
    margin-top: 7px;
    color: #6e6e6e;
}
.submitButton{
    width: 94%;
    position: absolute;
    bottom: 15px;
    left: 3%;
}

.orderInfo{
    background-color: #fff;
    width: 87%;
    margin: 0 auto;
    padding: 15px 10px;
    border-bottom: 1px dashed #c7c7c7;
    position: relative;
}
.orderInfo::before{
    content: '';
    position: absolute;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    background-color: #f5f5f5;
    left: -13px;
    bottom: -13px;
}
.orderInfo::after{
    content: '';
    position: absolute;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    background-color: #f5f5f5;
    right: -13px;
    bottom: -13px;
}
.ordertext{
    font-weight: 600;
}


.orderCount{
    background-color: #fff;
    width: 88%;
    margin: 0 auto;
    height: 30px;
    padding: 12px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
}
.orderCount div:nth-child(1){
    color: #6e6e6e;
}
.orderCount div:nth-child(2){
    color: #e4393c;
    font-weight: 600;
}

/* 设置盒子的最大高度，超过高度出现滚动条 */
.orderScroll{
    max-height: 300px;
    overflow-y: auto;
}
.orderScroll::-webkit-scrollbar{
    display: none;
}

</style>