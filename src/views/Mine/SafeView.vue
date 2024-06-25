<template>
    <!-- 顶部导航栏 -->
    <div class="cart-header">
        <van-nav-bar title="安全中心" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" :placeholder="true" />
    </div>
    <div class="bgcolor">
        <div class="container">
            <div class="content" @click="showPopup">
                <div>修改密码</div>
                <div><van-icon name="arrow" /></div>
            </div>
            <div class="content" style="border-bottom: none;" @click="destroy">
                <div>注销账号</div>
                <div><van-icon name="arrow" /></div>
            </div>
        </div>
        <van-button type="primary" block class="vanbutton" @click="exitLogin">退出登录</van-button>
        <!-- 修改密码弹出层 -->
        <van-popup v-model:show="show" closeable position="bottom" :style="{ height: '40%' }">
            <div class="pdtext">修改密码</div>
            <!-- @submit.prevent 来阻止表单的默认提交行为，因为你通常会在 Vue 方法中处理提交。 -->
            <van-form @submit="onSubmitreg">
                <van-cell-group inset>
                    <van-field
                        v-model="oldpassword"
                        type="password"
                        name="oldpassword"
                        label="旧密码"
                        placeholder="旧密码"
                        :rules="[{ pattern: /^.{6,}$/, message: '请填写旧密码' }]"
                    />
                    <van-field
                        v-model="newpassword"
                        type="password"
                        name="newpassword"
                        label="新密码"
                        placeholder="新密码"
                        :rules="[{ pattern: /^.{6,}$/, message: '请填写新密码，要求不少于6位字符' }]"
                    />
                </van-cell-group>
                <div>
                    <van-button round block type="primary" native-type="submit" class="submit">
                        确认修改
                    </van-button>
                </div>
            </van-form>          
        </van-popup>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { showConfirmDialog } from 'vant';
import axiosInstance from '../../utils/request';
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast,showToast } from 'vant';
import { cleartokenStorage } from '@/utils/cleartoken';
const router = useRouter()

//返回上一页面
const onClickLeft = () =>{
    history.back()
}

//清除cookie中的token
// function removeCookie(name) {  
//     document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';  
// } 

//确认退出登录
const exitLogin = () =>{
    showConfirmDialog({
        title: '退出登录',
        message:'是否确认退出登录？',
    })
    .then(() => {
        // on confirm
        axiosInstance.post('/logout',{}).then(function(res){
            if(res.data.code == 'F001'){
                cleartokenStorage()
                showSuccessToast('成功退出！');
                router.push({path:'/mine'})
            }else{
                showFailToast('退出失败，请重试！')
            }
        })
    })
    .catch(() => {
        // on cancel
    });
}

//确认注销账号
const destroy = () =>{
    showConfirmDialog({
        title: '注销账号',
        message:'是否确认注销账号，一旦确认无法恢复！！！',
    })
    .then(() => {
        // on confirm
        axiosInstance.post('/destroyAccount',{}).then(function(res){
            if(res.data.code == 'G001'){
                cleartokenStorage()
                showSuccessToast('成功退出！');
                router.push({path:'/mine'})
            }else{
                showFailToast('退出失败，请重试！')
            }
        })
    })
    .catch(() => {
        // on cancel
    });
}

//打开修改密码弹出层
const show = ref(false)
const showPopup = () =>{
    show.value = true
}

//修改密码
const oldpassword = ref()
const newpassword = ref()
const onSubmitreg = (val) => {
    axiosInstance.post('/updatePassword',{
        password: val.newpassword,
        oldPassword: val.oldpassword
    }).then(function(res){
        console.log(res)
        if(res.data.code == 'E001'){
            cleartokenStorage()
            // showSuccessToast('修改密码成功，请重新登录！');
            showToast('修改密码成功，请重新登录！');
            router.push({path:'/login'})
        }else if(res.data.code == 'E003'){
            showFailToast('旧密码错误！')
        }else{
            showFailToast('修改密码失败，请重试！')
        }
    })
};
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
    /* height: 200px; */
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
    padding: 0 20px;
    align-items: center;
    font-size: 15px;
    border-bottom: 2px #f9f9fa solid;
    height: 50px;
}
.vanbutton{
    background-color: #0c34ba;
    width: 95%;
    margin: 0 auto;
    border-radius: 50px;
    margin-top: 120px;
}

.submit{
    background-color: #0c34ba;
    position: absolute;
    width: 90%;
    bottom: 20px;
    left: 5%;
}
.pdtext{
    font-size: 20px;
    margin: 16px 16px 20px 16px;
}
</style>