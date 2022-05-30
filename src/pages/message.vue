<template>
  <div class="msglist">
    <div v-if="loading">正在获取聊天数据...</div>
    <Msbar
      v-for="item in listhere"
      :key="item.latestMessage.time"
      @click="talkToSB(item.username)"
      :item="item"
    ></Msbar>
  </div>
</template>
<script>
export default {
  name: "message",
};
</script>
<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Msbar from "../components/MessageBar.vue";

let store = useStore();
let router = useRouter();
let talkToSB = (un) => {
  
  router.push("/talkTo/"+un);
};
let listok = ref(false);
let listhere = computed(() => {
  return store.state.currentList;
});
let loading = ref(true);
onBeforeMount(async () => {
  let lst = await store.dispatch("getlist");
  loading.value = false;
  listok.value = lst == "success" ? true : false;
});
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
.msglist {
  padding: 0 10px;
}
</style>