<template>
    <div style="background-color:#fff;height:100vh;">
        <!-- 顶部导航栏 -->
        <div class="navTbar">
            <div class="logo">
                <div class="Rxlogo"><img src="../../public/Iconimg/home_active.png" alt=""></div>
                <div class="Rxtext">Luckin Coffee</div>
            </div>
            <router-link class="Home" to="/">首页</router-link>
        </div>
        <div class="Welcome">
            <div>欢迎回来！</div>
            <div>Please login to your accounts</div>
        </div>
        <!-- 手机号和密码的验证 -->
        <div style="margin-top: 40px;">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field
                        v-model="userphone"
                        name="userphone"
                        label="手机号"
                        placeholder="手机号"
                        :rules="[{ pattern: /^1[3-9]\d{9}$/, message: '请填写正确的手机号' }]"
                    />
                    <van-field
                        v-model="password"
                        type="password"
                        name="password"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ pattern: /^.{6,}$/, message: '请填写密码，要求不少于6位字符' }]"
                    />
                </van-cell-group>
                <!-- <div class="forgetpw">忘记密码？</div> -->
                <router-link class="forgetpw" to="/forgetpassword">忘记密码？</router-link>
                <div style="margin: 70px 20px;">
                    <van-button round block type="primary" native-type="submit" class="submit">
                        登录
                    </van-button>
                    <van-button round block type="primary" class="registered" @click="register">注册</van-button>
                </div>
            </van-form>
        </div>
        <UserRegister v-if="showreg" @getshowreg="getshowreg"></UserRegister>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axiosInstance from '../utils/request';
import { showFailToast } from 'vant';

// 导入路由方法
import { useRouter } from 'vue-router';
//导入自定义组件
import UserRegister from '../components/UserRegister.vue'
const router = useRouter()

//显示遮罩层
const showreg = ref(false)
//打开注册界面的遮罩层
const register = () =>{
    showreg.value = true;
}
//接收子组件传递过来的showreg的值
const getshowreg = (val) =>{
    showreg.value = val
}

const userphone = ref('');
const password = ref('');

//引入pinia，将获取的token存入pinia中
import { useCounterStore } from '@/stores/counter'
const piniaStore = useCounterStore()

//登录功能
const onSubmit = (values) => {
    console.log('submit', values);
    axiosInstance.post('/login',{
        password: password.value,
        phone: userphone.value
    }).then(function(res){
        console.log(res)
        if(res.data.code == 200){
            // 保存在sessionStorage中  
            sessionStorage.setItem('token', res.data.token);  
            // 从sessionStorage中读取  
            // const retrievedToken = sessionStorage.getItem('token');

            // 保存在localStorage中  
            localStorage.setItem('token', res.data.token);  
            // 从localStorage中读取  
            // const retrievedToken = localStorage.getItem('token');  

            // 保存在cookie中 
            document.cookie = `token=${res.data.token}; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/`;  
            // 读取cookie  
            // function getCookie(name) {  
            //     const value = `; ${document.cookie}`;  
            //     const parts = value.split(`; ${name}=`);  
            //     if (parts.length === 2) return parts.pop().split(';').shift();  
            //     return null;  
            // }         
            // const retrievedToken = getCookie('token');  
            // console.log(retrievedToken);
            
            //保存在pinia中
            piniaStore.setToken(res.data.token)
            
            //登录成功返回上一级页面
            // location.reload()
            // history.back()
            router.push({path:'/mine'})
            // router.back();
            // router.go(-1);
        }else{
            showFailToast('手机号或密码错误！');
        }
    }).catch(function(err){
        console.log(err)
        showFailToast('登录失败，请重试！');
    })
};

</script>

<style scoped>
.navTbar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 5px 20px 0 20px;
    border-bottom: 2px solid #f7f8f9;
}
.navTbar img{
    width: 46px;
}
.Rxtext{
    letter-spacing: 0.5px;
    font-weight: 600;
    color: #0c34ba;
    margin-left: 10px;
}
.logo{
    display: flex;
    align-items: center;
}
.Home{
    color: #0c34ba;
    font-weight: 550;
}
.Welcome{
    height: 90px;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 18px;
}
.Welcome div:nth-child(1){
    font-size: 32px;
}
.Welcome div:nth-child(2){
    font-size: 16px;
    color: #c8c9cc;
}
.forgetpw{
    cursor: pointer;
    float: right;
    color: #666666;
    font-size: 14px;
    cursor: pointer;
    margin-right: 12px;
}
.registered{
    border-color: #c8c9cc;
    background-color: #fff;
    color: black;
    margin-top: 50px;
}
.submit{
    background-color: #0c34ba;
    color: #fff;
}


</style>