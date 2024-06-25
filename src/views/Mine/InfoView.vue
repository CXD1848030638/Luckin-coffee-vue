<template>
    <!-- 顶部导航栏 -->
    <div class="cart-header">
        <van-nav-bar title="个人资料" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" :placeholder="true" />
    </div>
    <div class="bgcolor">
        <div class="container">
            <div class="content">
                <div>头像</div>
                <div><img :src="UserInfo.userImg" alt=""></div>
            </div>
            <div class="content">
                <div>用户id</div>
                <div>{{ UserInfo.userId }}</div>
            </div>
            <div class="content">
                <div>手机号</div>
                <div>{{ UserInfo.phone }}</div>
            </div>
            <div class="content">
                <div>昵称</div>
                <div>{{ UserInfo.nickName }}</div>
            </div>
            <div class="content">
                <div>简介</div>
                <div style="color: #a09d9c;">{{ UserInfo.desc }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axiosInstance from '../../utils/request';

//返回上一页面
const onClickLeft = () =>{
    history.back()
}

//获取用户信息
const UserInfo = ref([])
axiosInstance.get('/findAccountInfo',{}).then(function(res){
    UserInfo.value = res.data.result[0]
})
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
    /* height: 400px; */
    margin: 0 auto;
    background-color: #fff;
    margin-top: 70px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 10px;
}
.content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 10px;
    font-size: 15px;
    border-bottom: 2px #f9f9fa solid;
}
.content div img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.container .content:last-child{
    flex-direction: column;
    align-items: start;
    padding: 10px 10px;
    /* height: 90px; */
    border-bottom: none;
}
</style>