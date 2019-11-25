import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const types ={
  //设置一个名字判断认证是否通过
  SET_AUTHENTICATED:"SET_AUTHENTICATED",
  //配置用户
  SET_USER:"SET_USER"
}
const state ={
  //设置用户状态是否授权 
  isAuthenticated:false,
  //用户信息
  user:{

  }
}
const getters ={
  //获取用户状态是否授权 
  isAuthenticated:state=>state.isAuthenticated,
  //用户信息
  user:state=>state.user
}
const actions ={
  setAuthenticated:({commit},isAuthenticated)=>{
    commit(types.SET_AUTHENTICATED,isAuthenticated)
  },
  setUser:({commit},user)=>{
    commit(types.SET_USER,user)
  },
  setClear:({commit})=>{
    commit(types.SET_AUTHENTICATED,false);
    commit(types.SET_USER,null);
  }
}

const mutations ={
  [types.SET_AUTHENTICATED](state,isAuthenticated){
     if(isAuthenticated){
      state.isAuthenticated=isAuthenticated;
     }else{
      state.isAuthenticated=false;
     }
  },
  [types.SET_USER](state,user){
    if(user){
      state.user=user;
     }else{
      state.user={};
     }
  },

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
