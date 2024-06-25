import axios from 'axios'
import qs from 'qs'

const appkey = "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="; 

// 读取cookie  
// function getCookie(name) {  
//     const value = `; ${document.cookie}`;  
//     const parts = value.split(`; ${name}=`);  
//     if (parts.length === 2) return parts.pop().split(';').shift();  
//     return null;  
// } 
// const token = getCookie('token');

// 从sessionStorage中读取  
// const token = sessionStorage.getItem('token');

// 从localStorage中读取  
const token = localStorage.getItem('token'); 

// 创建axios实例
const instance = axios.create({
    baseURL: 'http://www.kangliuyong.com:10002/',
})


// 封装一个函数，为axios请求添加appkey  
function addAppKeyToParams(config) {  
    // 如果请求包含params，则添加appkey  
    if (config.params) {  
      config.params.appkey = appkey;  
    } else {  
      // 如果没有params，则创建一个  
      config.params = { appkey };  
    }  

    // 如果token存在，则将其添加到请求头中  
    // if (token) {  
    //   config.headers.Authorization = `Bearer ${token}`;  
    // }
    // 如果token存在，并且请求没有指定tokenString参数，则添加它  
    if (token && !config.params.tokenString) {  
      config.params.tokenString = token;  
    }  

    // 检查是否是POST请求且data是一个对象（不是字符串或FormData）  
    if (config.method === 'post' && config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {  
      // 使用qs库将对象转换为URL编码的字符串  
      config.data = qs.stringify(config.data);  
      // 添加Content-Type头  
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';  
    }  


    // 返回修改后的配置  
    return config;  
  }  
    
  // 前置拦截器  
  instance.interceptors.request.use(addAppKeyToParams);  
    
  // 导出axios实例  
  export default instance;
