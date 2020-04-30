// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Manager from './components/system/Manager'
import Home from './components/Home'
import axios from 'axios'
import VueResource from 'vue-resource'
// import ElementUI from 'elemet-ui'
// import "element-ui/lib/theme-chalk/index.css"
// axios.defaults.baseURL='http://localhost:5260/'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(VueResource)
// Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App,Home,axios},
  template: '<App/>'
})
