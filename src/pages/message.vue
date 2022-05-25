<template>
  <div class='msglist'>
    <div v-for='item in listhere' :key="item.latestMessage.time" @click="talkToSB(item.username)" class='aa'>
      <div>{{item.username}}</div>
      <div class="controlArea">=</div>
      <div class="msg">{{item.latestMessage.text}}</div>
    </div>
  </div>
</template>
<script setup>
import { ref,onBeforeMount } from "vue";
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import TalkTo from "../pages/talkto.vue";

let store = useStore();
let router = useRouter();
let talkToSB = (un)=>{
  console.log(un)
  router.push('/talkTo/zs')
}
let listok = ref(false);
let listhere = ref([]);
onBeforeMount(async ()=>{
  let lst = await store.dispatch('getlist');
  listok.value = lst=='success'?true:false;
  listhere.value = store.state.currentList;
})
</script>
<style scoped>
.fullPage {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
}
.message-trans-leave-active,.message-trans-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.message-trans-enter-from,
.message-trans-leave-to {
  transform: translateX(500px);
  opacity: 0;
}
</style>