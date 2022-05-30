import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
import store from '../store/index.js';
import HelloWorld from '../components/HelloWorld.vue'
import message from '../pages/message.vue'
import FBooks from '../pages/FBooks.vue'
import Find from '../pages/Find.vue'
import About from '../pages/About.vue'
import LoginPage from '../pages/Login.vue'
import RegPage from '../pages/Reg.vue'
import TalkTo from '../pages/talkto.vue'
import AboutMe from '../pages/AboutMe.vue'

const routerHistory = createWebHistory()
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path:'/login',
      name:'login',
      component:LoginPage
    },
    {
      path:'/reg',
      name:'reg',
      component:RegPage
    },
    {
      name:'home',
      path: '/',
      alias:'/home',
      component:message
      
    },
    {
      path:'/message',
      name:'message',
      component:message
    },
    {
      path:'/talkTo/:uid',
      name:'talkTo',
      component:TalkTo
    },
    {
      path:'/fBooks',
      component:FBooks
    },
    {
      path:'/find',
      component:Find
    },
    {
      path:'/about',
      component:About,
      children:[
        {
          path:'me',
          component:AboutMe
        }
      ]
    },
  ]
})
router.beforeEach(async (to, from) => {
  let noneedLoginPage = ['login','reg']
  // 检查用户是否已登录 // ❗️ 避免无限重定向
  if (!store.state.isLogined&&!noneedLoginPage.includes(to.name)) {
    // 将用户重定向到登录页面
    return { name: 'login' }
  }
  if(store.state.isLogined&&to.name=='login'){
    return { name: 'home' }
  }
})
export default router