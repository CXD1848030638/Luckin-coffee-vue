<template>
    <!-- 顶部导航栏 -->
    <div class="cart-header">
        <van-nav-bar title="地址管理" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" :placeholder="true" />
    </div>
    <div class="bgcolor">
        <div class="container">

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
.bgcolor{
    background-color: #0c34ba;
    width: 100%;
    height: 100px;
    position: fixed;
}
.container{
    width: 90%;
    height: 400px;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 70px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 10px;
}
</style>