import { createStore } from 'vuex'
import {login as Login} from '../api/index.js'
import {getHistoryByUID,getCurrentTalkList,getFriendList} from '../api/index.js'

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
  getters: {
    userInfoGetter (state) {
      return state.userInfo.name
    },
    ctabGetter(state){
      return state.currentTab;
    }
    
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
    },
    getMsgList(state,msglist){
      state[msglist.toUID] = msglist.messages;
    },
    sendmsto(state,msg){
      msg.time = msg.sendTime;
      state[msg.to].push(msg);
    }
  },
  actions: {
    asyncGetUserInfo ({ commit }) {
      setTimeout(() => {
        commit("getUserInfo", +new Date() + 'action')
      },2000)
    },
    //登录
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
    //获取跟某个用户的聊天记录
    async getmslist({state,commit},playload){
      let uid = playload;
      if(state[uid]!=undefined){
        return 'success';
      }
      try{
        let res = await getHistoryByUID(uid);
        commit('getMsgList',res);
        return 'success';

      }
      catch(e){
        console.log(e);
        return 'failed'
      }
    },
    //获取最近聊天列表
    async getlist({commit},playload){
      try{
        let res = await getCurrentTalkList();
        commit('getList',res.data);
        return 'success'
      }
      catch(e){
        return 'failed'
      }
      
    },
    //获取好友列表
    async getFriendList({commit},playload){
      try{
        let res = await getFriendList();
        commit('getFriends',res);
        return 'success';
      }
      catch(e){
        console.log(e)
      }
    },
    //发送消息
    async sendmsg({commit},playload){
        commit('sendmsto',playload);
        return 'success';
    }
  }
})
 
export default store