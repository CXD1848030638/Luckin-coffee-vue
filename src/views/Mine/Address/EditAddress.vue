<template>
    <!-- 顶部导航栏 -->
    <div class="cart-header">
        <van-nav-bar title="编辑地址" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" :placeholder="true" />
    </div>
    <div class="editAddress">
        <van-address-edit
            :area-list="areaList"
            show-delete
            show-set-default
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            :address-info="personInfo"
            @save="onSave"
            @delete="onDelete"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axiosInstance from '@/utils/request';
import { showConfirmDialog, showSuccessToast, showToast } from 'vant';
import { areaList } from '@vant/area-data'

//引入路由方法
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()

//获取当前要编辑的地址
const personInfo = ref()
axiosInstance.get('/findAddressByAid',{
    params:{
        aid: route.query.aid
    }
}).then((res) =>{
    if(res.data.code == 40000){
        personInfo.value = res.data.result[0]
    }else{
        showToast('页面出错，请退出重试！')
    }
})

//保存已编辑的地址
const onSave = (val) => {
    axiosInstance.post('/editAddress',{
        aid: val.aid,
        name: val.name,
        tel: val.tel,
        province: val.province,
        city: val.city,
        county: val.county,
        addressDetail: val.addressDetail,
        areaCode: val.areaCode,
        // postalCode: 邮政编码,
        isDefault: val.isDefault ? 1 :0
    }).then((res) => {
        if(res.data.code == 30000){
            showSuccessToast('编辑成功！')
            router.back()
        }else{
            showToast('编辑失败，请重试！')
        }
    })
};

//删除当前地址
// 删除地址接口
//   请求地址：http://www.kangliuyong.com:10002/deleteAddress
//   请求类型： POST
//   请求参数： {
//     appkey: 你的appkey,
//     tokenString: token字符串,
//     aid: 地址唯一标识
//   }
const onDelete = (val) => {
    showConfirmDialog({
        title: '删除地址',
        message:'是否确认删除该地址？',
    })
    .then(() => {
        // on confirm
        axiosInstance.post('/deleteAddress',{
            aid: val.aid
        }).then((res) => {
            if(res.data.code == 10000){
                showSuccessToast('删除成功！')
                router.back()
            }else{
                showToast('删除失败，请重试！')
            }
        })
    })
    .catch(() => {
        // on cancel
    });
};

//返回上一页面
const onClickLeft = () =>{
    history.back()
}
</script>

<style scoped>


.editAddress /deep/ .van-button:nth-child(1) {  
    background-color: #0c34ba;
    border-color: #0c34ba;
}

.editAddress /deep/ .van-switch--on{
    background-color: #0c34ba;
}
</style>