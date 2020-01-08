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
      component: Manager,
      children:[
        {
          name:'4-1',
          path:"4-1",
          component:User
        },
        {
          name:'4-2',
          path:'4-2',
          component:Role
        }
      ]
    }
    ,
    {
      path: '/home',
      name: 'home',
      component: Home
    }

  ]
})
