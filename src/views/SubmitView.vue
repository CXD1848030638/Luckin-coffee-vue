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
        
        <div class="submitButton"><van-button type="primary" round block color="#0c34ba">立即结算</van-button></div>
    </div>
</template>
    
<script setup>

//返回上一页面
const onClickLeft = () =>{
    history.back()
}
</script>
    
<style scoped>
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
</style>