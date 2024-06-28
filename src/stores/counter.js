import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const token = localStorage.getItem('token')

export const useCounterStore = defineStore('counter', () => {
  //保存token的值
  const tokenString = ref(token)
  const cartsList = ref([])
  // const doubleCount = computed(() => count.value * 2)
  //提交到订单上购物车的数据
  const setCartsList = (items) => {
    cartsList.value = items
  }
  //更新token的值
  const setToken = (item) =>{
    tokenString.value = item
  }

  return { cartsList, setCartsList, tokenString, setToken }
})
