import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
import Vue from 'vue'
import $ from 'jquery'
import fastclick from 'fastclick'
import store from './store'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import 'common/stylus/border.styl'
import fabric from 'fabric'

import '@/permission'  // permission control
import axios from './https'

fastclick.attach(document.body)

Vue.use(ElementUI)
Vue.use(fabric)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
