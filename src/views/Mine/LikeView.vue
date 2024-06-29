<template>
    <!-- 顶部导航栏 -->
    <div class="cart-header">
        <van-nav-bar title="我的收藏" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" :placeholder="true" />
    </div>
    <div class="bgcolor">
        <div class="container">
            <div class="empty" v-if="likeList.length == 0"><van-empty description="没有收藏数据！" /></div>
            <div class="likeTab" v-else  v-for="l in likeList" :key="l.id">
                <div class="likeImg"><img :src="l.smallImg" alt=""></div>
                <div class="likeCns">{{ l.name }}</div>
                <div class="likeEns">{{ l.enname }}</div>
                <div class="likePrice">
                    <div>￥{{ l.price }}</div>
                    <div @click="notLike(l.pid)"><van-icon name="delete-o" /></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axiosInstance from '@/utils/request';
import { showSuccessToast } from 'vant';
import { onMounted, ref } from 'vue';

//返回上一页面
const onClickLeft = () =>{
    history.back()
}

//获取用户所有的收藏商品
const likeList = ref([])
const getAllLike = () => {
    axiosInstance.get('/findAllLike',{}).then((res) => {
        likeList.value = res.data.result
    })
}

//点击删除图标取消收藏商品
const notLike = (val) => {
    axiosInstance.post('/notlike',{
        pid: val
    }).then((res) => {
        if(res.data.code == 900){
            showSuccessToast('取消成功！')
            getAllLike()
        }
    })
}

onMounted(()=>{
    getAllLike()
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
    max-height: 80vh;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 70px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
    overflow-y: auto;
    user-select: none;
}
.container::-webkit-scrollbar{
    display: none;
}


.likeTab{
    width: 48%;
    height: 240px;
}
.likeImg img{
    width: 100%;
    height: 160px;
}

.likeCns{
    color: #222222;
    font-size: 15px;
    margin-top: 3px;
}
.likeEns{
    font-size: 14px;
    color: #a2a2a2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 150px;
}
.likePrice{
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
}
.likePrice div:nth-child(1){
    color: #ee0a24;
    font-weight: 600;
    font-size: 16px;
}

.empty{
    height: 80vh;
    margin: 0 auto;
}
</style>