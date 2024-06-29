<template>
    <div class="orderTab" v-for="(o,index) in props.list" :key="index">
        <div class="orderImg"><img :src="o.small_img" alt=""></div>
        <div class="Infotext">
            <div class="infoChs">
                <div>{{ o.name }}</div>
                <div>{{ o.rule }}</div>
            </div>
            <div class="infoEns">{{ o.enname }}</div>
            <div class="infoPrice">
                <div>￥{{ o.price }}</div>
                <div><van-icon name="cross" />{{ o.count }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

//接收父组件传入的订单列表
const props = defineProps(['list'])

</script>

<style scoped>
.orderTab{
    height: 90px;
    margin: 10px 0;
    display: flex;
}

.orderImg img{
    height: 90px;
    width: 90px;
}

.Infotext{
    margin-left: 12px;
}
.infoChs{
    display: flex;
    margin-top: 4px;
}
.infoChs div:nth-child(1){
    color: #222222;
    font-size: 15px;
}
.infoChs div:nth-child(2){
    color: #777777;
    margin-left: 16px;
    line-height: 23px;
    font-size: 12px;
}
.infoEns{
    font-size: 14px;
    color: #a2a2a2;
    margin-top: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 210px;
}
.infoPrice{
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}
.infoPrice div:nth-child(1){
    color: #ee0a24;
    font-weight: 600;
}
.infoPrice div:nth-child(2){
    font-size: 15px;
    color: #7c7c7c;
}
</style>