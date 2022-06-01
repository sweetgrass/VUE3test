<template>
  <div class="msglist">
    <div v-if="loading">正在获取聊天数据...</div>
    <Msbar
      v-for="item in listhere"
      :key="item.to"
      @click="talkToSB(item.to)"
      :item="item"
    >
      <div class="cpanel" @click.stop='msgOprate($event)' :data-uid='item.to'>
        <div class='msgcontrol' data-type='delete' >删除</div>
        <div class='msgcontrol' data-type='up'>置顶</div>
      </div>
    </Msbar>
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
let msgOprate = (e)=>{
  
  let type = e.target.dataset.type;
  let uid = e.target.parentNode.dataset.uid;
  if(type == 'delete'){
    store.commit('deleteTalk',uid);
  }
  else if(type == 'up'){
    store.commit('upTalk',uid);
  }
}
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
.cpanel{
  position: absolute;
  top:0;
  right:0;
  width:160px;
  height:100%;
  background: rgb(240, 240, 240);
  display: none;
}
.msbar:hover>.cpanel{
  display: block;
}
.msgcontrol{
  box-sizing: border-box;
  font-size: 12px;
  width:100%;
  height:50%;
  line-height: 30px;
  border-bottom: 1px solid #ddd;
}
</style>