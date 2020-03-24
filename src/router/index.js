import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Login = () => import("../views/Login")
const Home = () => import("../views/Home/Home")
const Welcome = () => import("../views/Welcome")
// 校级管理员页面

// 院级管理员的页面

// 审核教师的页面

// 命题教师的页面
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children:[
      {
        path: '/welcome',
        component: Welcome
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
