<template>
    <!-- 顶部导航栏 -->
    <div class="cart-header">
        <van-nav-bar title="新增地址" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" :placeholder="true" />
    </div>
    <div class="addAddress">
        <van-address-edit
            :area-list="areaList"
            show-set-default
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
        />
    </div>
</template>

<script setup>
import { showSuccessToast } from 'vant';
import { areaList } from '@vant/area-data'
import axiosInstance from '@/utils/request';

//引入路由组件并初始化
import { useRouter } from 'vue-router';
const router = useRouter()

//保存新增地址
const onSave = (val) => {
    axiosInstance.post('/addAddress',{
        name: val.name,
        tel: val.tel,
        province: val.province,
        city: val.city,
        county: val.county,
        addressDetail: val.addressDetail,
        areaCode: val.areaCode,
        // postalCode: 邮政编码,
        isDefault: val.isDefault ? 1 : 0
    }).then((res)=>{
        if(res.data.code == 9000){
            showSuccessToast('保存成功！')
            router.back()
        }
    })
};

//返回上一页面
const onClickLeft = () =>{
    history.back()
}

</script>

<style scoped>

.addAddress /deep/ .van-button {  
    background-color: #0c34ba;
    border-color: #0c34ba;
}

.addAddress /deep/ .van-switch--on{
    background-color: #0c34ba;
}
</style>