<template>
    <div>
        <!-- 顶部导航栏 -->
        <div class="cart-header">
            <van-nav-bar title="订单结算" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" :placeholder="true" />
        </div>
    </div>
</template>
    
<script setup>

//返回上一页面
const onClickLeft = () =>{
    history.back()
}
</script>
    
<style scoped>
    
</style>