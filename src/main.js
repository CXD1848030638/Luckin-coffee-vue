// import './assets/main.css'

// 引入vant
import Vant from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
//创建一个pinia实例
const pinia = createPinia()

app.use(pinia)

// 使用vant
app.use(Vant);

app.use(router)

app.mount('#app')
