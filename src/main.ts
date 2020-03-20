import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import WX from 'weixin-js-sdk'
const WX = require('weixin-js-sdk')
import JsApi from './utils/jsapi'
Vue.config.productionTip = false
Vue.prototype.$JsApi = JsApi
Vue.prototype.$wx = WX
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

