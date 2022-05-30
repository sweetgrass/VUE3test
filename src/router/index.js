import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
import store from '../store/index.js';
import HelloWorld from '../components/HelloWorld.vue'
import message from '../pages/message.vue'
import FBooks from '../pages/FBooks.vue'
import Friend from '../pages/Friend.vue'
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
      component:LoginPage,
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/reg',
      name:'reg',
      component:RegPage,
      meta:{
        keepAlive:false
      }
    },
    {
      name:'home',
      path: '/',
      alias:'/home',
      component:message,
      meta:{
        keepAlive:true
      }
      
    },
    {
      path:'/message',
      name:'message',
      component:message,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/talkTo/:uid',
      name:'talkTo',
      component:TalkTo,
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/fBooks',
      name:'fBooks',
      component:FBooks,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/friendInfo/:uid',
      name:'friendInfo',
      component:Friend,
      meta:{
        keepAlive:false
      }
    },
    {
      path:'/find',
      name:'find',
      component:Find,
      meta:{
        keepAlive:true
      }
    },
    {
      path:'/about',
      name:'about',
      component:About,
      children:[
        {
          path:'me',
          component:AboutMe
        }
      ],
      meta:{
        keepAlive:true
      }
    },
  ]
})
const pathTabName = {
  'home':'消息',
  'fBooks':'通讯录',
  'find':'发现',
  'about':'关于'
}
router.beforeEach(async (to, from) => {
  //--------------通过路由地址访问时，解决选中tab的初始化问题---------------
  let toRootPath = to.fullPath.split('/')[1];
  if(toRootPath!=undefined&&pathTabName[toRootPath]!=undefined){
    let name = pathTabName[toRootPath]
    store.commit('changeTab',name);
  }

  //-----------------登录验证部分--------------------
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