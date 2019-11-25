import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "./http"
import "./element-ui"


Vue.config.productionTip = false;
//  axios.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded';

Vue.prototype.$axios=axios;//生命一个实例 在所有组件中使用
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
