import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
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
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    }
    ,
    {
      path: '/goLogin',
      name: 'login',
      component: Login
    }

  ]
})
