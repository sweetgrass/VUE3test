<template>
  <Home></Home>
</template>

<script setup>
import Home from './pages/Home.vue'
import {useStore} from 'vuex'
let store = useStore();
let uidlist = store.state.userlist;

//生成假数据，方便同步最新一条消息
uidlist.forEach(uid => {
  store.dispatch('getmslist',uid);
});
</script>
