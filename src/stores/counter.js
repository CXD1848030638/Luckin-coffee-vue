import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const token = localStorage.getItem('token')

export const useCounterStore = defineStore('counter', () => {
  //保存token的值
  const tokenString = ref(token)
  //更新token的值
  const setToken = (item) =>{
    tokenString.value = item
  }

  //保存订单界面的商品信息
  const cartsList = ref([])
  //提交到订单上购物车的数据
  const setCartsList = (items) => {
    cartsList.value = items
  }


  // const doubleCount = computed(() => count.value * 2)

  return { cartsList, setCartsList, tokenString, setToken}
})
