 import axios from "axios";
import { Loading,Message } from 'element-ui';
import router from "./router";

let loading;
function openLoading(){//加载动画
    loading = Loading.service({
        lock:true,
        text:"努力加载中...",
        background:"rgba(0,0,0,0.8)"
    });
   
}


function outLoading(){//停止动画
        loading.close();
}
//请求拦截
axios.interceptors.request.use(config=>{
    openLoading();//开始动画
    //设置统一的请求头
    if(localStorage.eleToken){
        config.headers.Authorization = localStorage.eleToken;
    }
    return config;
},
err=> Promise.reject(err)
)

//响应拦截
axios.interceptors.response.use(response=>{
    outLoading();//停止动画
    if(localStorage.eleToken){
    response.headers.Authorization = localStorage.eleToken;
    }
    return response;
},
error=> {
     outLoading();//停止动画  
    Message.error(error.response.data);//错误提醒
    //获取错误的状态码判断登录是否过期
    const {status} =error.response;
    if(status==401){
      Message.error("登录过期,请重新登录!");
     //清除token,跳转回登录
      localStorage.removeItem("eleToken")
      router.push("/login")
        

    }
    return Promise.reject(error)
}
)
 export default axios;