import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'
import axios from 'axios'

Vue.prototype.$http = axios

// 全局过滤器
Vue.filter('setWH', (url, arg) => {
  return url.replace('w.\h',arg)
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
