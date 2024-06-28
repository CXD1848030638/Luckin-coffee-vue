<template>
    <GoLogin v-if="!retrievedToken"></GoLogin>
    <div class="onlogin" v-else>
        <img :src="personInfo.userBg" alt="">
        <div class="person">
            <div class="personinfo">
                <div class="image"><img :src="personInfo.userImg" alt=""></div>
                <div class="info">
                    <div>{{ personInfo.nickName }}</div>
                    <div>{{ personInfo.desc }}</div>
                </div>
            </div>
            <div class="personTab">
                <router-link class="Tab" to="/MineInfo">
                    <div>个人资料</div>
                    <div><van-icon name="arrow" /></div>
                </router-link>
                <router-link class="Tab" to="/MineOrder">
                    <div>我的订单</div>
                    <div><van-icon name="arrow" /></div>
                </router-link>
                <router-link class="Tab" to="/MineLike">
                    <div>我的收藏</div>
                    <div><van-icon name="arrow" /></div>
                </router-link>
                <router-link class="Tab" to="/MineAdreess">
                    <div>地址管理</div>
                    <div><van-icon name="arrow" /></div>
                </router-link>
                <router-link class="Tab" style="border:none" to="/MineSafe">
                    <div>安全中心</div>
                    <div><van-icon name="arrow" /></div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import GoLogin from '/src/components/GoLogin.vue';
import { ref,onMounted } from 'vue';
import axiosInstance from '../utils/request';

//引入store，用户获取store里的token
// import { useStore } from 'vuex';  
// const store = useStore(); 

// 判断用户是否登录
const retrievedToken = localStorage.getItem('token');
const retrievedTokense = sessionStorage.getItem('token');
// const retrievedToken = store.getters.getToken;

const personInfo = ref([])
const getpersonInfo = () =>{
    axiosInstance.get("/findMy",{}).then(function(res){
        personInfo.value = res.data.result[0]
    });
}


onMounted(()=>{
    getpersonInfo()
})
</script>

<style scoped>
.onlogin img{
    width: 100%;
    height: 150px;
}
.person{
    background-color: rgb(255, 255, 255,0.5);
    width: 94%;
    height: 360px;
    border-top-left-radius: 4%;
    border-top-right-radius: 4%;
    position: absolute;
    left: 3%;
    top: 110px;
    /* opacity: 0.5; */
}
.personinfo{
    display: flex;
    padding: 10px;
}
.personinfo img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.info{
    margin-left: 20px;
}
.info div:nth-child(1){
    margin-top: 3px;
    color: #0c34ba;
    font-weight: 600;
}
.info div:nth-child(2){
    margin-top: 12px;
    font-size: 14px;
    color: #666666;
}


.personTab{
    padding: 10px;
    margin-top: 20px;
}
.Tab{
    display: flex;
    justify-content: space-between;
    padding: 13px 24px;
    border-bottom: 2px solid #f0f0f0;
    color: #323233;
    cursor: pointer;
}
</style>