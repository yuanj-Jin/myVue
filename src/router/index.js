import Vue from 'vue'
import Router from 'vue-router'
import Manager from '../components/system/Manager'
import Home from '../components/Home'
import App from '@/App'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Role from '../components/system/Role'
import User from '../components/system/User'
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
    ,
    {
      path: '/4-1',
      name: '4-1',
      component: User
    }
    ,
    {
      path: '/4-2',
      name: '4-2',
      component: Role
    }

  ]
})
