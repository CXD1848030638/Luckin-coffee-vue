import { useCounterStore } from "@/stores/counter";

const piniaStore = useCounterStore()

//清除cookie中的token
function removeCookie(name) {  
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';  
} 

export function cleartokenStorage(){
    // 清除localStorage的token
    localStorage.removeItem('token');

    // 清除sessionStorage的token
    sessionStorage.removeItem('token');

    //清除cookie中的token
    removeCookie('token');

    //清除pinia中的token
    piniaStore.setToken()
}
