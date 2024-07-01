<template>
  <!-- 商品详情页面最外层容器 -->
  <div class="detail-container">
      <!-- 第一部分 -->
      <div class="detail-header">
          <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true" :placeholder="true" />
      </div>
      <!-- 第二部分 -->
      <div class="detail-content">
          <!-- 商品图片层 -->
          <div class="product-img">
              <img :src="detailProductData.large_img" />
          </div>
          <!-- 商品详情盒子 -->
          <div class="product-info-box">
              <!-- 商品标题层 -->
              <div class="product-title">
                  <div class="left">
                      <div class="zh-title">{{ detailProductData.name }}</div>
                      <div class="en-title">{{ detailProductData.enname }}</div>
                  </div>
                  <div class="right">¥{{ detailProductData.price }}</div>
              </div>
              <!-- 商品规格层 -->
              <div class="product-guige-box">
                  <!-- 奶油 -->
                  <div class="guige" v-if="detailProductData.cream_desc && detailProductData.cream[0]">
                      <div class="guige-title">{{ detailProductData.cream_desc }}</div>
                      <div class="guige-tag-box">
                          <div class="guige-tag" @click="changeIndex('creamIndex', index , item)" :class="{ active: creamIndex == index }" v-for="(item, index) in detailProductData.cream" :key="index">
                              {{ item }}
                          </div>
                      </div>
                  </div>

                  <!-- 温度 -->
                  <div class="guige" v-if="detailProductData.tem_desc && detailProductData.tem[0]">
                      <div class="guige-title">{{ detailProductData.tem_desc }}</div>
                      <div class="guige-tag-box">
                          <div class="guige-tag" @click="changeIndex('temIndex', index , item)" :class="{ active: temIndex == index }" v-for="(item, index) in detailProductData.tem" :key="index">
                              {{ item }}
                          </div>
                      </div>
                  </div>

                  <!-- 糖 -->
                  <div class="guige" v-if="detailProductData.sugar_desc && detailProductData.sugar[0]">
                      <div class="guige-title">{{ detailProductData.sugar_desc }}</div>
                      <div class="guige-tag-box">
                          <div class="guige-tag" @click="changeIndex('sugarIndex', index , item)" :class="{ active: sugarIndex == index }" v-for="(item, index) in detailProductData.sugar" :key="index">
                              {{ item }}
                          </div>
                      </div>
                  </div>
              </div>
              <!-- 选择数量 -->
              <div class="product-num">
                  <span>选择数量</span>
                  <van-stepper v-model="num" theme="round" button-size="22" disable-input />
              </div>
              <!-- 商品描述 -->
              <div class="product-desc">
                  <div class="title">商品描述</div>
                  <p v-for="(item, index) in detailProductData.desc" :key="index">{{ index + 1 }}、{{ item }}</p>
              </div>
          </div>
      </div>
      <!-- 第三部分 -->
      <div class="detail-footer">
          <van-action-bar :placeholder="true">
              <van-action-bar-icon icon="bag" text="购物袋" :badge="shopcartCount" />
              <van-action-bar-icon :icon="findlike ? 'like' : 'like-o'" :text="findlike ? '已收藏' : '收藏'" color="#e4393c" @click="productLike"/>
              <van-action-bar-button color="#0c34ba" type="warning" text="加入购物袋" @click="Addshopcart"/>
          </van-action-bar>
      </div>
  </div>
</template>

<script setup>
// 导入vue相关包
import { computed, ref, watchEffect } from "vue";
// 导入axios
import axiosInstance from "../utils/request";
import { useRoute } from "vue-router";
import { showSuccessToast } from "vant";
// 得到route页面路由对象,主要用于获取页面参数
const route = useRoute();
// 获取传递过来的pid参数
const pid = route.query.pid;
// 定义一个变量保存当前商品详情数据
const detailProductData = ref({});
// 定义一个商品数量
const num = ref(1);
// 定义规格索引号
const creamIndex = ref(0);
const temIndex = ref(0);
const sugarIndex = ref(0);
//获取规格文本
const creamItem = ref(null); //奶油
const temItem = ref(null);   //温度
const sugarItem = ref(null); //糖

// 定义一个函数,实现规格点击以后高亮的功能
function changeIndex(indexName, indexVal, item) {
  if (indexName == "creamIndex") {
      creamIndex.value = indexVal;
      creamItem.value = item
  } else if (indexName == "temIndex") {
      temIndex.value = indexVal;
      temItem.value = item
  }
  if (indexName == "sugarIndex") {
      sugarIndex.value = indexVal;
      sugarItem.value = item
  }
}
// 通过axios获取商品详情数据
axiosInstance.get("/productDetail", {
      params: {
          pid: pid,
      },
  })
  .then(res => {
      // console.log(res);
      // 处理数据
      res.data.result[0].desc = res.data.result[0].desc.split("\n");
      res.data.result[0].cream = res.data.result[0].cream.split("/");
      res.data.result[0].sugar = res.data.result[0].sugar.split("/");
      res.data.result[0].tem = res.data.result[0].tem.split("/");
      // 赋值
      detailProductData.value = res.data.result[0];

      // console.log(res.data.result[0].tem);
      //初始化规格文本为第一个选项
      creamItem.value = res.data.result[0].cream[0]
      temItem.value = res.data.result[0].tem[0]
      sugarItem.value = res.data.result[0].sugar[0]
  }
);

const onClickLeft = () => {
  // 使用bom对象中的history返回上一页
  history.back();
  // 使用router返回上一页
  // router.back();
  // router.go(-1);
};


//合并规格文本
const combineItem = computed(()=>{
  // return creamItem.value || temItem.value || sugarItem.value ? `${creamItem.value}/${temItem.value}/${sugarItem.value}` : ''
  // 初始化结果字符串  
  let result = '';  
  // 检查每个选项，只有当它们有值时，才添加到结果字符串中  
  // 并且仅在添加新值时，才在前面添加 '/' 符号（除了第一个值）  
  if (creamItem.value) {  
    result += creamItem.value;  
  }  
  if (temItem.value && result) { // 如果 result 已经有值（即已添加了至少一个选项），则添加 '/'  
    result += '/';  
  }  
  if (temItem.value) {  
    result += temItem.value;  
  }  
  if (sugarItem.value && result) { // 确保不会在 temItem 后面立即添加 '/'  
    result += '/';  
  }  
  if (sugarItem.value) {  
    result += sugarItem.value;  
  }  

  return result;  
});

//添加购物袋
const Addshopcart = () =>{
  // console.log(combineItem.value)
  // console.log(creamItem.value,temItem.value,sugarItem.value)
  axiosInstance.post('/addShopcart',{
    pid: pid,
    count: num.value,
    rule: combineItem.value
  }).then(function(res){
    console.log(res)
    showSuccessToast('添加购物袋成功！')
    getshopcartCount()
  })
}

//查询用户是否收藏商品
const findlike = ref(false)
axiosInstance.get('/findlike',{
  params:{
    pid: pid
  }
}).then((res)=>{
  if(res.data.result.length){
    findlike.value = true
  }else{
    findlike.value = false
  }
})

//收藏商品
const productLike = () => {
  if(!findlike.value){
    //收藏商品
    axiosInstance.post('/like',{
      pid: pid
    }).then((res)=>{
      if(res.data.code == 800){
        showSuccessToast('收藏成功！')
        findlike.value = true
      }
    })
  }else{
    //取消收藏商品
    axiosInstance.post('/notlike',{
      pid: pid
    }).then((res)=>{
      console.log(res);
      findlike.value = false
    })
  }
}

//查询购物车商品总数量
const shopcartCount = ref()
const getshopcartCount = () =>{
  axiosInstance.get('/shopcartCount',{}).then((res) =>{
    if(res.data.code === 4000){
      shopcartCount.value = res.data.result
    }
  })
}
getshopcartCount()
</script>

<!-- scoped属性代表让当前样式成为局部样式, 仅对当前组件有效 -->
<style scoped>
.detail-container {
  background: #f5f5f5;
}
.detail-container .detail-content .product-img img {
  width: 100%;
}
.detail-container .product-info-box {
  background: white;
  margin: 0px 10px;
  border-radius: 6px;
  /* CSS3变形属性-位移(移动) */
  transform: translateY(-12px);
  /* 内填充 */
  padding: 15px;
  /* 设置盒子模型为内减模式 */
  box-sizing: border-box;
  /* 设置字体大小 */
  font-size: 14px;
}

.detail-container .product-info-box .product-title {
  /* 开启flex布局 */
  display: flex;
  /* 设置主轴方向对齐方式  主轴方向默认是从左向右的 */
  justify-content: space-between;
  /* 设置侧轴方向对齐方式  侧轴是垂直主轴, 默认侧轴是从上向下的 */
  align-items: center;
}
.detail-container .product-info-box .product-title .left .en-title {
  color: #b8b9b4;
  font-size: 12px;
}
.detail-container .product-info-box .product-title .right {
  color: #e4393c;
  font-weight: bold;
  font-size: 16px;
}

.detail-container .product-info-box .product-guige-box {
  margin-top: 15px;
  margin-bottom: 15px;
}
.detail-container .product-info-box .product-guige-box .guige {
  /* 开启flex布局 */
  display: flex;
  margin-bottom: 10px;
}
.detail-container .product-info-box .product-guige-box .guige .guige-title {
  width: 50px;
}
.detail-container .product-info-box .product-guige-box .guige .guige-tag-box {
  display: flex;
}
.detail-container .product-info-box .product-guige-box .guige .guige-tag {
  width: 80px;
  height: 26px;
  background: #e8e8e8;
  border-radius: 50px;
  text-align: center;
  line-height: 26px;
  margin-right: 10px;
}
.detail-container .product-info-box .product-guige-box .guige .guige-tag.active {
  background: #3762f0;
  color: white;
}
.detail-container .product-info-box .product-num {
  display: flex;
  justify-content: space-between;
  padding: 18px 0;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 10px;
}
.detail-container .product-info-box .product-desc p {
  color: #6f6f6f;
  font-size: 12px;
}
</style>

<style>
.van-stepper--round .van-stepper__plus {
  color: white !important;
  background: #ee0a24 !important;
}
.van-stepper--round .van-stepper__minus {
  color: #ee0a24;
  border: 1px solid #ee0a24;
}
</style>
