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

// 注册全局的scroller组件
import scroller from '@/components/Scroller'
Vue.component('scroller',scroller)

// 注册全局的loading组件
import loading from '@/components/Loading'
Vue.component('loading',loading)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
