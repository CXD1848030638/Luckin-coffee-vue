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
            @save="onSave"
            @delete="onDelete"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import { areaList } from '@vant/area-data'


const onSave = () => showToast('save');
const onDelete = () => showToast('delete');

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