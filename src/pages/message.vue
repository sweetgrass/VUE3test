<template>
  <div>
    <div>我是信息页</div>
    <div @click="talkToSomebody">张三</div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import {useRouter} from 'vue-router'
import TalkTo from "../pages/talkto.vue";

let router = useRouter();
let talkToSomebody = ()=>{
  router.push('/talkTo/zs')
}
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