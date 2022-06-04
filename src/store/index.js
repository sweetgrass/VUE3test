import { createStore } from 'vuex'
import { login as Login } from '../api/index.js'
import { getHistoryByUID, getCurrentTalkList, getFriendList } from '../api/index.js'

const store = createStore({
  state: {
    userInfo: {
      name: 'myName'
    },
    // 最近聊天用户列表
    userlist: ['zs', 'ls', 'ww', 'zl'],
    user: {},
    // 登录状态
    isLogined: true,
    //最近选中的tab，用于在不同路由跳转的时候也能保持tab正确选中
    currentTab: '消息',
    //最近聊天概览消息列表，用于message页显示最近的聊天记录
    currentList: [],
    // 好友列表
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
  //-------------------------------------------------------------------
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
    logOut(state,uid){
      state.isLogined = false;
    },
    //获取聊天列表
    getCurrentTalkList(state, list) {
      state.currentList = list;
    },
    deleteTalk(state, uid) {
      let list = state.userlist;
      let idx1 = list.findIndex(item => { return item == uid });
      state.userlist.splice(idx1, 1);

      let clist = state.currentList;
      let idx2 = clist.findIndex(item => {
        return item.to == uid
      })
      state.currentList.splice(idx2, 1);
    },
    upTalk(state, uid) {
      let list = state.userlist;
      let idx1 = list.findIndex(item => { return item == uid });
      let user = state.userlist.splice(idx1, 1)[0];
      state.userlist.unshift(user);

      let clist = state.currentList;
      let idx2 = clist.findIndex(item => {
        return item.to == uid
      })
      let msg = state.currentList.splice(idx2, 1)[0];

      state.currentList.unshift(msg);
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
      state.currentList.splice(idx, 1, msg)
    }
  },
  //----------------------------------------------------------------------------------- 
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
        //如果是新建的聊天，则需要
        // 1、更新最近聊天用户列表
        // 2、在store中增加该用户的消息历史记录，虽然为空
        // 3、在最近聊天消息列表中增加一条空记录，让会话出现在message页面
        if (!state.userlist.includes(uid)) {
          //将用户存入最近聊天用户列表
          state.userlist.push(uid);
          // 在store中增加该用户历史记录
          let fres = {
            toUID: uid,
            messages: []
          }
          commit('getMsgList', fres)
          // 生成空白消息到最近聊天概览列表
          let now = new Date();
          state.currentList.push({
            to: uid,
            user: 'me',
            text: '',
            time: now.getFullYear() + '/' + now.getMonth() + '/' + now.getDay() + '-' + (now + '').split(' ')[4]
          })
        }
        //否则直接api获取假数据
        else {
          let res = await getHistoryByUID(uid);
          commit('getMsgList', res);
        }

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
      //等待初始化
      await function () { return new Promise((resolve) => { setTimeout(() => { resolve(1) }, 1000) }) }();
      try {
        let list = [];
        users.forEach(uid => {
          let mslist = state[uid];
          let msg = {};
          //如果只是打开过聊天对话框，那么该用户历史消息列表中不会有记录，则需要生成一条空白消息
          if (mslist.length == 0) {
            let now = new Date();
            msg = {
              to: uid,
              user: 'me',
              text: '',
              time: now.getFullYear() + '/' + now.getMonth() + '/' + now.getDay() + '-' + (now + '').split(' ')[4]
            }
          }
          else {
            msg = mslist[mslist.length - 1];
          }
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