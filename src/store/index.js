import { createStore } from 'vuex'
import {login as Login} from '../api/index.js'

const store = createStore({
  state: {
    userInfo: {
      name:'myName'
    },
    user:{},
    isLogined:false,
    currentTab:'消息'
  },
  mutations: {
    getUserInfo (state, name) {
      state.userInfo.name = name
    },
    changeTab(state,name){
      state.currentTab = name;
    },
    logIn(state,user){
      state.isLogined = true;
      state.user = user;
    }
  },
  actions: {
    asyncGetUserInfo ({ commit }) {
      setTimeout(() => {
        commit("getUserInfo", +new Date() + 'action')
      },2000)
    },
    async login({commit},playload){
      try{
        let a = await Login(playload);
        if(a.status = 'ok'){
          commit('logIn',playload.un);
          return 'ok'
        }
        else{
          return 'failed'
        }
      }
      catch(e){
        console.log(e);
        return 'failed'
      }
    }
  },
  getters: {
    userInfoGetter (state) {
      return state.userInfo.name
    },
    ctabGetter(state){
      return state.currentTab;
    }
    
  }
})
 
export default store