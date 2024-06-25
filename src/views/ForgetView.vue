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
            <div>忘记密码！</div>
            <div>forget password!</div>
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
                    <van-field
                        v-model="useremail"
                        name="useremail"
                        label="邮箱"
                        placeholder="邮箱"
                        :rules="[{ pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: '邮箱格式错误，请重新输入' }]"
                    />
                    <van-field
                        v-model="emailsms"
                        name="emailsms"
                        center
                        clearable
                        label="邮箱验证码"
                        placeholder="请输入邮箱验证码"
                        :rules="[{ pattern: /^\d{4,6}$/, messgae:'验证码为六位数字'}]"
                    >
                        <template #button>
                            <van-button size="small" color="#0c34ba" type="primary" @click="sendpassword" v-if="isSending" style="margin-right:-10px;">
                                <div>发送验证码</div>
                            </van-button>
                            <van-button size="small" color="#0c34ba" type="primary" v-else disabled style="margin-right:-10px;">
                                <!-- <div>{{ time }}s后重新获取</div> -->
                                <van-count-down :time="60000" @finish="onFinish">
                                    <template #default="timeData">
                                        <span style="color: #fff;">{{ timeData.seconds }}s后重新获取</span>
                                    </template>
                                </van-count-down>
                            </van-button>
                        </template>
                    </van-field>
                </van-cell-group>
                <!-- <div class="forgetpw">忘记密码？</div> -->
                <router-link class="forgetpw" to="/login">已有账号，立即登录</router-link>
                <div style="margin: 70px 20px;">
                    <van-button round block type="primary" native-type="submit" class="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axiosInstance from '../utils/request';
import { showToast } from 'vant';

// 导入路由方法
import { useRouter } from 'vue-router';
const router = useRouter()

const isSending = ref(true)
//倒计时结束触发事件
const onFinish = () => isSending.value = true;
//发送验证码
const sendpassword = () =>{
    console.log(useremail.value)
    if(!useremail.value){
        showToast('邮箱获取失败，请重新输入！')
    }else{
        isSending.value = false
        axiosInstance.post('/emailValidCode',{
            email: useremail.value
        }).then(function(res){
            if(res.data.code == 'J002'){
                showToast('获取邮箱验证码失败！请重试！')
            }
        })
    }
}

const userphone = ref('');
const password = ref('');
const useremail = ref('')
const emailsms = ref('')

//提交
const onSubmit = (values) => {
    console.log(values);
    
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
    margin-right: 21px;
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