<template>
  <div class="NotLogin">
    <van-empty image="error" description="请先登录">
        <van-button round type="primary" class="bottom-button" @click="GotoLogin">去登陆</van-button>
    </van-empty>
  </div>
</template>

<script setup>
// 导入路由方法
import { useRouter } from 'vue-router';
const router = useRouter()

const GotoLogin = () =>{
    router.push({ path: "/login" })
}

</script>

<style scoped>
.NotLogin{
    margin-top: 100px;
}
.bottom-button{
    background-color: #0c34ba;
}
</style>