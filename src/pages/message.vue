<template>
  <div class="msglist">
    <div v-if="loading">正在获取聊天数据...</div>
    <Msbar
      v-for="item in listhere"
      :key="item.time"
      @click="talkToSB(item.to)"
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
  let lst = await store.dispatch("getCurrentTalkList");
  loading.value = false;
  listok.value = lst == "success" ? true : false;
});
</script>
<style scoped>
.msglist {
  box-sizing: border-box;
  padding: 0 10px;
  width:100%;
  height:100%;
  overflow-y:auto ;
}
</style>