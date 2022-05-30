<template>
  <div class="allc">
    <div class="operation">
      <IconBar :bartext="'新的朋友'"
        ><template v-slot:icon><div>+</div></template></IconBar
      >
      <IconBar :bartext="'黑名单'" :noBorder="true"
        ><template v-slot:icon><div>B</div></template></IconBar
      >
    </div>
    <div>所有好友</div>
    <div class="ulist" @click.prevent="friendInfo($event)">
      <div v-if="loading">正在获取好友列表...</div>
      <IconBar v-for="fr in flist" 
        :key="fr.uid" 
        :bartext="fr.un"
        :data-uid='fr.uid'
        ><template v-slot:icon
          ><div>{{ fr.un.replace("用户", "") }}</div></template
        ></IconBar
      >
      <div>你有{{ flist.length }}个好友</div>
    </div>
  </div>
</template>
<script>
    export default {
      name: 'fbooks',
    };
</script>
<script setup>
import IconBar from "../components/IconBar.vue";
import { ref, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
let flist = computed(() => {
  return store.state.friendList;
});
let store = useStore();
let loading = ref(true);
onBeforeMount(async () => {
  let res = await store.dispatch("getFriendList");
  if ((res = "success")) {
    loading.value = false;
  }
});
let router = useRouter();
let friendInfo = (e) => {
  let path = e.path;
  for(let i = 0;i<path.length;i++){
     
      if(path[i].className=='alc'){
          let uid = path[i].dataset.uid;
          router.push('/friendInfo/'+uid);
      }
  }
};
</script>
<style scoped>
.allc {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.operation {
  margin-bottom: 30px;
}
</style>