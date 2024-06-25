// import './assets/main.css'

// 引入vant
import Vant from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入vuex
import store from './stores/counter.js'

const app = createApp(App)

app.use(store)

// 使用vant
app.use(Vant);

app.use(createPinia())
app.use(router)

app.mount('#app')
