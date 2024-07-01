<template>
    <van-popup
        v-model:show="show"
        closeable
        position="bottom"
        :style="{ height: '50%'}"
        @click-close-icon="close"
        @click-overlay="close"
    >
        <div class="slectAddress">选择地址</div>
        <div class="selectadr">
            <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
                @select="selectAddress"
                
            />
        </div>
    </van-popup>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import axiosInstance from '@/utils/request';
import { showToast } from 'vant';

//引入路由并初始化一个实例对象
import { useRouter } from 'vue-router';
const router = useRouter()

//引入pinia状态管理工具并初始化
import { useCounterStore } from '@/stores/counter';
const piniaStore = useCounterStore()


//控制弹出层的开启和关闭
const show = ref()
const close = () =>{
    piniaStore.setShow(false)
}

watchEffect(() => {
    show.value = piniaStore.show
})

const chosenAddressId = ref();
const list = ref([]);

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
        address: `${obj.province}${obj.city == obj.province ? '' : obj.city}${obj.county}${obj.addressDetail}` 
    }))
    list.value = resultAddress
    
    //获取选中的默认地址
    const chosenAddress = ref(list.value.filter(obj => {
        return obj.isDefault === 1
    }))
    if(chosenAddress.value.length > 0){
        chosenAddressId.value = chosenAddress.value[0].id
        //将默认地址存入pinia
        piniaStore.setAddress(chosenAddress.value[0])
    }
})


//选中地址后的回调
const selectAddress = (val) =>{
    piniaStore.setAddress(val)
    piniaStore.setShow(false)
}

//新增地址
const onAdd = () => {
    router.push({ path: "/addaddress" })
};

//编辑地址
const onEdit = (item) => {
    router.push({ 
        path: "/editaddress",
        query: { aid: item.aid }
    })
};
</script>

<style scoped>
/* 弹出层的样式 */
.slectAddress{
    margin: 15px 10px;
    font-size: 17px;
    font-weight: 600;
}

.selectadr{
    max-height: 80%;
    overflow-y: auto;
}

/* 默认图标的样式 */
.selectadr /deep/ .van-tag{
    background-color: #0c34ba;
}

/* 新增地址的样式 */
.selectadr /deep/ .van-button {  
    background-color: #0c34ba;
    border-color: #0c34ba;
}
.selectadr /deep/ .van-address-list__bottom{
    border: 1px solid #fff;
    margin-bottom: 6px;
}

/* 选中按钮的样式 */
.selectadr /deep/ .van-address-item .van-radio__icon--checked .van-icon{
    background-color: #0c34ba;
}

/* 缩小地址与地址之间的间距 */
.selectadr /deep/ .van-address-item{
    margin-bottom: 0;
}
.selectadr /deep/ .van-address-list{
    padding: 0 12px 50px 12px;
}

.van-popup::-webkit-scrollbar{
    display: none;
}
</style>