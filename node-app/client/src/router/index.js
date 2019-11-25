import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home'
import Register from '../views/register/Register'
import Login from '../views/login/Login'
import Bgcolor from '../views/bgcolor/Bgcolor'
import Inshow from '../views/home/childrenn/Inshow'
import Err from "../views/common/error/Err"
 import Fundlist from '../views/fundlist/Fundlist'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/index"
  },
  {
    path: '/index',
    name:"/index",
    component:Home,
    children:[
      {path:"", component:Bgcolor},
      {path:"/bgcolor", name:"bgcolor",component:Bgcolor},
      {path:"/inshow", name:"inshow",component:Inshow},
      {path:"/fundlist", name:"fundlist",component:Fundlist}
    ]
  },
  {
    path: '/register',
    name:"/register",
    component:Register
  },
  {
    path: '*',
    name:"/error",
    component:Err
  },
  {
    path: '/login',
    name:"/login",
    component:Login
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//路由守卫
 router.beforeEach((to,form,next)=>{
  //判断是否有token
  const isLogin = localStorage.eleToken ? true :false;
  //当前是登录或者注册可以正常访问
  if(to.path ==="/register"||to.path==="/login" ){
    next();
  }else{
    //如果token正确则跳转 ,如果错误则跳转登录
    isLogin ? next() : next("/login");
  }
})
export default router;
