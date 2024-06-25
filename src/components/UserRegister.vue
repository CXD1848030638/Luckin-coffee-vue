<!-- eslint-disable vue/require-toggle-inside-transition -->
<template>
    <div>
        <!-- 点击注册弹出注册的遮罩层 -->
        <transition name="fade">  
            <div class="mask">
                <div class="regTab">
                    <div class="regnav">
                        <div>注册</div>
                        <div @click="closeMask">×</div>
                    </div>
                    <!-- @submit.prevent 来阻止表单的默认提交行为，因为你通常会在 Vue 方法中处理提交。 -->
                    <van-form @submit="onSubmitreg">
                        <van-cell-group inset>
                            <van-field
                                v-model="userinfo.reguserphone"
                                name="reguserphone"
                                label="手机号"
                                placeholder="手机号"
                                :rules="[{ pattern: /^1[3-9]\d{9}$/, message: '请填写正确的手机号' }]"
                            />
                            <van-field
                                v-model="userinfo.regpassword"
                                type="password"
                                name="regpassword"
                                label="密码"
                                placeholder="密码"
                                :rules="[{ pattern: /^.{6,}$/, message: '请填写密码，要求不少于6位字符' }]"
                            />
                            <van-field
                                v-model="userinfo.regusername"
                                type="username"
                                name="regusername"
                                label="昵称"
                                placeholder="昵称"
                                :rules="[{ required: true, message: '请填写昵称' }]"
                            />
                        </van-cell-group>
                        <div>
                            <van-button round block type="primary" native-type="submit" class="submit">
                                注册
                            </van-button>
                        </div>
                    </van-form>
                </div>
            </div>  
        </transition>
    </div>
</template>

<script setup>
import { ref,reactive } from 'vue';
import axiosInstance from '../utils/request';

//给父组件传递showreg的值，关闭遮罩层
const showreg = ref(false)
//使用defineEmits注册一个自定义事件
const emit = defineEmits(["getshowreg"])
const closeMask = () =>{
    emit("getshowreg", showreg.value)
}


const userinfo = reactive({
    reguserphone: '',
    regpassword: '',
    regusername: ''
})

//注册功能
const onSubmitreg = (val) => {
    console.log('submitreg', val);
    axiosInstance.post('/register', {
        nickName: userinfo.regusername,
        password: userinfo.regpassword,
        phone: userinfo.reguserphone
    }).then(function(res) {
        console.log(res)
    }).catch(function(err){
        console.log(err)
    })
};
</script>

<style scoped>
/* 注册功能的遮罩层 */
.mask {  
  position: fixed;  
  top: 0;  
  left: 0;  
  width: 100%;  
  height: 100%;  
  background-color: rgba(0, 0, 0, 0.5);  
  display: flex;  
  justify-content: center;  
  align-items: flex-end;   
  box-sizing: border-box;  
  z-index: 9999;  
}
/* 注册页面的出现的动画 */
@keyframes slideUp {  
  0% {  
    transform: translateY(100%); 
    opacity: 0;  
  }  
  100% {  
    transform: translateY(0);   
    opacity: 1;   
  }  
}  
  
.fade-enter-active, .fade-leave-active {  
    transition: opacity 0.5s;  
}  
.fade-enter, .fade-leave-to {  
    opacity: 0;  
} 
.regTab{
    width: 100%;
    height: 350px;
    background-color: #fff;
    animation: slideUp 0.5s ease-out forwards;
}

.regnav{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
}
.regnav div:nth-child(1){
    font-size: 26px;
    color: #44445c;
}
.regnav div:nth-child(2){
    cursor: pointer;
    font-size: 36px;
    color: #c8c9cc;
}

.submit{
    background-color: #0c34ba;
    position: absolute;
    width: 90%;
    bottom: 30px;
    left: 5%;
}
</style>