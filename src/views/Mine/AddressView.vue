<template>
    <!-- 顶部导航栏 -->
    <div class="cart-header">
        <van-nav-bar title="地址管理" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" :placeholder="true" />
    </div>
    <div class="addressList">
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            :switchable="false"
            @add="onAdd"
            @edit="onEdit"
        />

    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import axiosInstance from '@/utils/request';
import { showToast } from 'vant';
import { useRouter } from 'vue-router';

const router = useRouter()

const chosenAddressId = ref('1');
const list = ref([])
// const list = [
//     {
//         id: '1',
//         name: '张三',
//         tel: '13000000000',
//         address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
//         isDefault: true,
//     },
//     {
//         id: '2',
//         name: '李四',
//         tel: '1310000000',
//         address: '浙江省杭州市拱墅区莫干山路 50 号',
//     }
// ];

//查询已保存的所有地址
const addressList = ref([])
axiosInstance.get('/findAddress',{}).then((res) => {
    if(res.data.code == 20000){
        addressList.value = res.data.result
    }else{
        showToast('查询地址失败，请检查网络！')
    }
})

watchEffect(() => {
    //得到完整地址
    const resultAddress = addressList.value.map(obj => ({
        ...obj,
        address: `${obj.province}${obj.city == obj.province ? '' : obj.province}${obj.county}${obj.addressDetail}` 
    }))
    list.value = resultAddress
})


//新增地址
const onAdd = () => {
    router.push({ path: "/addaddress" })
};

//编辑地址
const onEdit = (item, index) => {
    // console.log(item,index);
    showToast('编辑地址:' + index)
    router.push({ path: "/editaddress" })
};

//返回上一页面
const onClickLeft = () =>{
    history.back()
}
</script>

<style scoped>

/* 默认图标的样式 */
.addressList /deep/ .van-tag{
    background-color: #0c34ba;
}

/* 新增地址的样式 */
.addressList /deep/ .van-button {  
    background-color: #0c34ba;
    border-color: #0c34ba;
}
.addressList /deep/ .van-address-list__bottom{
    background: #f5f5f5;
    border: 1px solid #f5f5f5;
    margin-bottom: 12px;
}
</style>