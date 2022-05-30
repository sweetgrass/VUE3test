<template>
  <div class="container">
    <div v-if='store.state.isLogined' class="topbar">{{ currentTab }}</div>
    <TabBar v-if='store.state.isLogined' type="" :tabs="tabs" @tabChange="tabChange" containerHeight="60px" :choosed='currentTab'></TabBar>
    <!-- 需要keep-alive 和 transition的router-view 都需要用此方法进行包裹 -->
    <router-view v-slot='{Component,route}'>
      <keep-alive>
        <component
            :is="Component"
            :key="route.meta.usePathKey ? route.path : undefined"
          />
      </keep-alive>
    </router-view>
    
    
  </div>
</template>

<script setup>
import TabBar from "../components/TabBar.vue";
import {useStore} from 'vuex'
import { ref,reactive, computed } from "vue";
let store = useStore();
let currentTab = computed(()=>store.getters.ctabGetter)
let islogin = computed(()=>store.state.isLogined);

const tabs = ref([
  {
    name: "消息",
    path: "/message",
  },
  {
    name: "通讯录",
    path: "/fBooks",
  },
  {
    name: "发现",
    path: "/find",
  },
  {
    name: "关于",
    path: "/about",
  },
]);
const tabChange = (name) => {
    store.commit('changeTab',name);
};
</script>

<style scoped>
.container {
  width: 100%;
  height:100%;
  margin: auto;
  box-sizing: border-box;
  position: relative;
  padding:60px 0;
}
.topbar{
    height:60px;
    width:100%;
    line-height:60px;
    background: rgb(240,240,240);
    position:fixed;
    top:0;
    z-index: 555;
}
</style>