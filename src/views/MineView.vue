<template>
    <GoLogin v-if="!retrievedToken"></GoLogin>
    <div class="onlogin" v-else>
        <!-- <img :src="personInfo.userBg" alt=""> -->
        <div class="userBg"><van-uploader v-model="fileList" :after-read="afterRead" reupload :deletable="false" :max-count="1"/></div>
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
import { ref,computed } from 'vue';
import axiosInstance from '../utils/request';
import { showFailToast, showToast, showLoadingToast } from 'vant';

// 判断用户是否登录
const retrievedToken = localStorage.getItem('token');

//初始化用户背景
const fileList = ref([
    // Uploader根据文件后缀来判断是否为图片文件,如果图片URL中不包含类型信息，可以添加isImage标记来声明
    { url: '', isImage: true },
]);

//获取用户信息
const personInfo = ref([])
const getpersonInfo = () =>{
    axiosInstance.get("/findMy",{}).then(function(res){
        personInfo.value = res.data.result[0]
        fileList.value[0].url = res.data.result[0].userBg
    });
}
getpersonInfo()

//调用计算属性得到图片的类型的字符串
const imageType = ref('')
const Typeresult = computed(()=>{
    return imageType.value.slice(6)
})

//上传用户背景
const afterRead = (file) =>{
    // 去除 base64 编码的前缀部分
    const base64WithoutPrefix = file.content.replace(/^data:image\/\w+;base64,/, '');
    imageType.value = file.file.type
    axiosInstance.post('/updateUserBg',{
        imgType: Typeresult.value,
        serverBase64Img: base64WithoutPrefix
    }).then((res)=>{
        showLoadingToast({
            message: '加载中...',
            forbidClick: true,
        });
        if(res.data.code == 'H001'){
            showToast('背景上传成功！')
        }else{
            showFailToast('背景上传失败')
        }
    })
}


</script>

<style scoped>
.userBg /deep/ .van-uploader{
    width: 100%;
}
.userBg /deep/ .van-uploader__preview{
    width: 100%;
    margin: 0;
}
.userBg /deep/ .van-uploader__preview-image{
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