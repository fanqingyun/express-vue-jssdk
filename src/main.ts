import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import WX from 'weixin-jsapi'
Vue.config.productionTip = false
Vue.prototype.$wx = WX
let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(vue)
