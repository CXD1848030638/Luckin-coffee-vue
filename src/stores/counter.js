import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
//引入vuex
import { createStore } from 'vuex'  

export default createStore({  
  state: {  
    token: null
  },  
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    },
  },
  actions: {
    // 可以在这里定义异步操作，例如从后端获取 token
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },  
})  


export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
