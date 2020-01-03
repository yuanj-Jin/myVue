import Vue from 'vue'
import Router from 'vue-router'
import Manager from '../components/system/Manager'
import Home from '../components/system/Home'
import App from '@/App'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import '@/theme-et/index.css'
Vue.use(ElementUi)


Vue.use(Router)
// const Login = () =>
//   import(
//     '../components/Login'
//   )


export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
    ,
    {
      path: '/manager',
      name: 'login',
      component: Manager
    }
    ,
    {
      path: '/home',
      name: 'home',
      component: Home
    }

  ]
})
