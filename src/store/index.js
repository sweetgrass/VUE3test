import { createStore } from 'vuex'
import {login as Login} from '../api/index.js'
import {getCurrentTalkList,getFriendList} from '../api/index.js'
const store = createStore({
  state: {
    userInfo: {
      name:'myName'
    },
    user:{},
    isLogined:true,
    currentTab:'消息',
    currentList:[],
    friendList:[]
  },
  mutations: {
    getUserInfo (state, name) {
      state.userInfo.name = name
    },
    changeTab(state,name){
      if(state.currentTab == name){return}
      state.currentTab = name;
    },
    logIn(state,user){
      state.isLogined = true;
      state.user = user;
    },
    getList(state,list){
      state.currentList = list;
    },
    getFriends(state,flist){
      state.friendList = flist;
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
        return 'failed';
      }
    },
    async getlist({commit},playload){
      try{
        let res = await getCurrentTalkList();
        commit('getList',res.data);
        return 'success'
      }
      catch(e){
        return 'fail'
      }
      
    },
    async getFriendList({commit},playload){
      try{
        let res = await getFriendList();
        commit('getFriends',res);
        return 'success';
      }
      catch(e){
        console.log(e)
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