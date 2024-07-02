<template>
    <van-loading v-if="showLoading" text-color="#0c34ba" class="van-loading">
        加载中...
    </van-loading>
    <div v-else>
        <div v-if="orderlist.length > 0">
            <div class="text">订单信息</div>
            <div>
                <div v-for="(o,index) in reduceOrder" :key="index" class="reduceOrder">
                    <div class="orderNo">
                        <div class="orderoid">订单编号：{{ o.oid }}</div>
                        <div v-if="o.status == 1" style="cursor: pointer;">确认收货</div>
                        <div v-else>已完成<van-icon name="delete-o" style="margin-left: 5px;" @click="deleteOid(o.oid)"/></div>
                    </div>
                    <div class="orderInfo">
                        <div class="orderTab" v-for="(d,index) in o.orders" :key="index">
                            <div class="orderImg"><img :src="d.smallImg" alt=""></div>
                            <div class="Infotext">
                                <div class="infoChs">
                                    <div>{{ d.name }}</div>
                                    <div>{{ d.rule }}</div>
                                </div>
                                <div class="infoEns">{{ d.enname }}</div>
                                <div class="infoPrice">
                                    <div>￥{{ d.price }}</div>
                                    <div><van-icon name="cross"/>{{ d.count }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="orderTime">2023-05-01 18:22:30</div>
                    <div class="orderCount">
                        <div>共计 {{ computedCount(o) }} 件商品</div>
                        <div>订单金额：￥{{ computedPrice(o) }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else><van-empty description="您还未购买商品" /></div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import axiosInstance from "@/utils/request";
import { showConfirmDialog, showFailToast, showSuccessToast } from 'vant';

//加载动画
const showLoading = ref(false)

//查询全部订单
const orderlist = ref([])
const getOrderList = () =>{
    showLoading.value = true;
    axiosInstance.get('/findOrder',{
        params:{
            //其中 status 值为 0, 1, 2 ==> 0: 全部，1: 进行中，2: 已完成
            status: 2
        }
    }).then((res) =>{
        orderlist.value = res.data.result
    }).finally(() => {
        showLoading.value = false; // 请求完成后隐藏 loading
    });
}
getOrderList()

const reduceOrder = ref()
watchEffect(()=>{
    reduceOrder.value = orderlist.value.reduce((res,item) =>{
        const existingOrder = res.find(order => order.oid === item.oid);

        if (existingOrder) {
            existingOrder.orders.push(item);
        } else {
            res.push({
                oid: item.oid,
                status: item.status,
                orders: [item]
            });
        }

        return res; // 确保每次迭代返回 res
    },[])
    // console.log(reduceOrder.value);

})

//计算订单商品总数量
const computedCount = (order) =>{
    let sumcount = 0;
    order.orders.forEach(obj =>{
        sumcount += obj.count
    })
    return sumcount;
}

//计算订单商品的总价格
const computedPrice = (order) =>{
    let sumprice = 0;
    order.orders.forEach(obj =>{
        sumprice += parseFloat(obj.price) * obj.count
    })
    return sumprice.toFixed(2)
}

//删除订单
const deleteOid = (val) =>{
    showConfirmDialog({
        title: '删除订单',
        message:'确定删除订单？删除后无法恢复！',
    })
    .then(() => {
        // on confirm
        axiosInstance.post('/removeOrder',{
            oid: val
        }).then((res) =>{
            if(res.data.code == 90000){
                showSuccessToast('删除成功！')
                getOrderList()
            }else{
                showFailToast('删除失败！')
            }
        })
    })
    .catch(() => {
        // on cancel
    });
}
</script>

<style scoped>
.text{
    font-weight: 600;
    padding: 10px;
    background-color: #fff;
}
.orderoid{
    color: #727272;
}
.reduceOrder{
    margin: 0 0 20px 0; 
    background-color: #fff;
    padding: 0 12px;
}

.orderNo{
    display: flex;
    justify-content: space-between;
    padding-top: 16px;
}

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
    width: 200px;
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

.orderInfo{
    border-bottom: 1px dashed #c7c7c7;
    position: relative;
    padding: 10px 0;
}
.orderInfo::before{
    content: '';
    position: absolute;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    background-color: #f5f5f5;
    left: -24px;
    bottom: -12px;
}
.orderInfo::after{
    content: '';
    position: absolute;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    background-color: #f5f5f5;
    right: -24px;
    bottom: -12px;
}

.orderTime{
    color: #6e6e6e;
    width: 96%;
    margin: 0 auto;
    margin-top: 20px;
}

.orderCount{
    background-color: #fff;
    width: 96%;
    margin: 0 auto;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    padding-bottom: 16px;
}
.orderCount div:nth-child(1){
    color: #6e6e6e;
}
.orderCount div:nth-child(2){
    color: #e4393c;
    font-weight: 600;
}

/* 加载动画 */
.van-loading{
    position: absolute;
    left: 38%;
    top: 52%;
    color: #0c34ba
}
</style>