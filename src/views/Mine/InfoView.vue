<template>
    <!-- 顶部导航栏 -->
    <div class="cart-header">
        <van-nav-bar title="个人资料" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" :placeholder="true" />
    </div>
    <div class="bgcolor">
        <div class="container">
            <div class="content">
                <div>头像</div>
                <!-- <div><img :src="UserInfo.userImg" alt=""></div> -->
                 <div><van-uploader class="userImg" v-model="fileList" :after-read="afterRead" reupload :deletable="false" preview-size="50px" :max-count="1"/></div>
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
import { computed, ref } from 'vue'
import axiosInstance from '../../utils/request';
import { showFailToast, showToast, showLoadingToast } from 'vant';

//返回上一页面
const onClickLeft = () =>{
    history.back()
}

//获取用户信息
const UserInfo = ref([])
axiosInstance.get('/findAccountInfo',{}).then(function(res){
    UserInfo.value = res.data.result[0]
    // console.log(res.data.result[0])
    fileList.value[0].url = res.data.result[0].userImg
})

//头像上传
const fileList = ref([
    // Uploader根据文件后缀来判断是否为图片文件,如果图片URL中不包含类型信息，可以添加isImage标记来声明
    { url: '', isImage: true },
]);


//调用计算属性得到图片的类型的字符串
const imageType = ref('')
const Typeresult = computed(()=>{
    return imageType.value.slice(6)
})

//定义头像上传后的回调函数
const afterRead = (file) =>{
    // 去除 base64 编码的前缀部分
    const base64WithoutPrefix = file.content.replace(/^data:image\/\w+;base64,/, '');
    imageType.value = file.file.type
    axiosInstance.post('/updateAvatar',{
        imgType: Typeresult.value,
        serverBase64Img: base64WithoutPrefix
    }).then((res)=>{
        showLoadingToast({
            message: '加载中...',
            forbidClick: true,
        });
        if(res.data.code == 'H001'){
            showToast('头像上传成功！')
        }else{
            showFailToast('头像上传失败')
        }
        
    })
}

// console.log(fileList.value[0].url)


//   修改昵称接口
//   请求地址：http://www.kangliuyong.com:10002/updateNickName
//   请求类型： POST
//   请求参数： {
//     appkey: 你的appkey,
//     tokenString: token字符串,
//     nickName: 你的昵称
//   }

//   修改简介接口
//   请求地址：http://www.kangliuyong.com:10002/updateDesc
//   请求类型： POST
//   请求参数： {
//     appkey: 你的appkey,
//     tokenString: token字符串,
//     desc: 简介
//   }
// axiosInstance.post('/updateNickName',{
//     nickName: '陈凯东'
// }).then((res)=>{
//     console.log(res)
// })

// axiosInstance.post('/updateDesc',{
//     desc: '发财！发财！我要发财！'
// }).then((res)=>{
//     console.log(res)
// })
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
.userImg{
    /* width: 40px;
    height: 40px;
    border-radius: 50%; */
    user-select: none;
}
.container .content:last-child{
    flex-direction: column;
    align-items: start;
    padding: 10px 10px;
    /* height: 90px; */
    border-bottom: none;
}
</style>