<template>
    <div class="cart-container" v-for="(cart,index) in carts" :key="index">
        <van-swipe-cell>
            <div class="cart-cell">
                <van-checkbox v-model="cart.checked" icon-size="22px" checked-color="#0c34ba"></van-checkbox>
                <div class="cart-img"><img :src="cart.small_img" alt=""></div>
                <div class="cart-content">
                    <div class="cart-chstext">
                        <div>{{ cart.name }}</div>
                        <div>{{ cart.rule }}</div>
                    </div>
                    <div class="cart-engtext">{{ cart.enname }}</div>
                    <div class="cart-price">
                        <div class="price">￥{{ cart.price }}</div>
                        <div class="stepper"><van-stepper v-model="cart.count" theme="round" button-size="22" disable-input /></div>
                    </div>
                </div>
            </div>
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" />
            </template>
        </van-swipe-cell>
    </div>
</template>

<script setup>
import { ref, watch, watchEffect,defineProps, onMounted } from 'vue'

//接收父组件传入的全选值
const props = defineProps(['ischecked','list'])

// 为每个cart对象添加checked属性
const carts = ref(props.list.map(cart => ({
    ...cart,
    checked: props.ischecked 
})));

//全选按钮
watch(()=> props.ischecked,(newVal)=> {
    carts.value.forEach(cart => {
        cart.checked = newVal
    })
})

//计算总价
// const totalPrice = ref(0)
const computeTotalPrice = ()=>{
    let total = 0;
    carts.value.forEach(cart => {
        if(cart.checked){
            total += parseFloat(cart.price) * cart.count
        }
    })
    return total.toFixed(2)
}

const emit = defineEmits(["update:checked","updateTotalPrice"]);
watchEffect(()=>{
    // 检查是否所有的cart都被选中
    const allChecked = carts.value.every(cart => cart.checked);
    // 如果props.ischecked与allChecked不一致，则通过emit更新父组件的ischecked
    if (props.ischecked !== allChecked && allChecked==true) {
        emit('update:checked', allChecked);
    }

    //将总价传到父组件
    const totalPrice = computeTotalPrice()
    emit('updateTotalPrice', totalPrice) 
})



</script>

<style scoped>
.cart-container{
    margin: 10px auto;
    background-color: #fff;
    border-radius: 10px;
    width: 95%;
    height: 110px;
    /* display: flex;
    align-items: center; */
}
.van-checkbox{
    margin: -6px 0 0 10px;
}
.cart-img img{
    width: 88px;
    height: 88px;
    margin-left: 10px;
}
.cart-content{
    height: 90px;
    width: 56%;
    margin: 10px;
}
.cart-chstext{
    display: flex;
    margin-top: 2px;
}
.cart-chstext div:nth-child(1){
    color: #222222;
    font-size: 16px;
}
.cart-chstext div:nth-child(2){
    color: #777777;
    margin-left: 16px;
    line-height: 23px;
    font-size: 14px;
}
.cart-engtext{
    font-size: 14px;
    color: #a2a2a2;
    margin-top: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.cart-price{
    display: flex;
    justify-content: space-between;
}
.price{
    color: #ee0a24;
    font-weight: 600;
    margin-top: 16px;
}
.stepper{
    margin-top: 16px;
}

/* 删除滑动单元格 */
.delete-button {
    height: 100%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 1px;
    margin-left: 1px;
}
.cart-cell{
    display: flex;
    align-items: center;
}
</style>