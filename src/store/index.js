import { createStore } from 'vuex'
import { login as Login } from '../api/index.js'
import { getHistoryByUID, getCurrentTalkList, getFriendList } from '../api/index.js'

const store = createStore({
  state: {
    userInfo: {
      name: 'myName'
    },
    userlist: ['zs', 'ls', 'ww', 'zl'],
    user: {},
    isLogined: true,
    currentTab: '消息',
    currentList: [],
    friendList: []
  },
  getters: {
    userInfoGetter(state) {
      return state.userInfo.name
    },
    ctabGetter(state) {
      return state.currentTab;
    }

  },
  mutations: {
    getUserInfo(state, name) {
      state.userInfo.name = name
    },
    //tab切换事件
    changeTab(state, name) {
      if (state.currentTab == name) { return }
      state.currentTab = name;
    },
    //登录
    logIn(state, user) {
      state.isLogined = true;
      state.user = user;
    },
    //获取聊天列表
    getCurrentTalkList(state, list) {
      state.currentList = list;
    },
    //获取好友列表
    getFriends(state, flist) {
      state.friendList = flist;
    },
    //通过uid查询聊天记录，每个用户单独字段，用uid作为key
    getMsgList(state, msglist) {
      state[msglist.toUID] = msglist.messages;
    },
    // 发送消息
    // msg{
    //   user:-->'发送者'
    //   to:-->接收者
    //   text:-->消息内容
    //   sendTime:-->发送时间
    //   time:-->时间，也用于显示消息发送状态
    // }
    sendmsto(state, msg) {
      state[msg.to].push(msg);
      let lst = state.currentList;
      //替换最近消息列表里的最新消息
      let idx = 0;
      for (let i = 0; i < lst.length; i++) {
        let msgl = lst[i];
        
        if (msgl.to == msg.to) {
          idx = i;
          break;
        }
      }
      state.currentList.splice(idx,1,msg)
    }
  },
  actions: {
    asyncGetUserInfo({ commit }) {
      setTimeout(() => {
        commit("getUserInfo", +new Date() + 'action')
      }, 2000)
    },
    //登录
    async login({ commit }, playload) {
      try {
        let a = await Login(playload);
        if (a.status = 'ok') {
          commit('logIn', playload.un);
          return 'ok'
        }
        else {
          return 'failed'
        }
      }
      catch (e) {
        console.log(e);
        return 'failed';
      }
    },
    //获取跟某个用户的聊天记录
    async getmslist({ state, commit }, playload) {
      let uid = playload;
      if (state[uid] != undefined) {
        return 'success';
      }
      try {
        let res = await getHistoryByUID(uid);
        commit('getMsgList', res);
        return 'success';

      }
      catch (e) {
        console.log(e);
        return 'failed'
      }
    },
    //获取最近聊天列表
    async getCurrentTalkList({ state, commit }, playload) {
      let users = state.userlist;
      await function () { return new Promise((resolve) => { setTimeout(() => { resolve(1) }, 1000) }) }();
      try {
        let list = [];
        users.forEach(uid => {
          let mslist = state[uid];
          let msg = mslist[mslist.length - 1];
          msg.to = uid;
          list.push(msg);

        })
        commit('getCurrentTalkList', list);
        return 'success'
      }
      catch (e) {
        console.log(e)
        return 'failed'
      }

    },
    //获取好友列表
    async getFriendList({ commit }, playload) {
      try {
        let res = await getFriendList();
        commit('getFriends', res);
        return 'success';
      }
      catch (e) {
        console.log(e)
      }
    },
    //发送消息
    //用setTimeout模拟消息发送延时
    async sendmsg({ state, commit }, playload) {
      let msg = playload;
      commit('sendmsto', msg);
      setTimeout(() => {
        state[msg.to].pop();
        msg.time = msg.sendTime;
        commit('sendmsto', msg)
      }, 1000);
      return 'success';
    }
  }
})

export default store