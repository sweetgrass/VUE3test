<template>
  <!-- <teleport to='body'> -->
  <div class="fullPageContainer">
    <div class="topArea">
      <div class="returnbtn" @click='returnToFList'>返回</div>
      <div class="more">更多</div>
    </div>
    <div class="contentC">
      <div class="talkTo" @click='talkTo'>聊天</div>
      <UserCard :user="user">{{ user.uid }}</UserCard>
      <div class="infoBar">设置备注信息</div>
      <div class="infoBar">电话号码</div>
      <div class="infoBar">朋友权限</div>
    </div>
  </div>
  <!-- </teleport> -->
</template>
<script>
export default {
  name: "friend",
};
</script>
<script setup>
import UserCard from "../components/UserCard.vue";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
let user = ref({
  name: "test",
  uid: "",
});
let uid = '';
onBeforeMount(() => {
  uid = router.currentRoute.value.params.uid;
  user.value.uid = uid;
});
let returnToFList = ()=>{
  router.push('/fBooks');
}
let talkTo = ()=>{
  router.push("/talkTo/"+uid);
}
</script>
<style scoped>
.topArea {
  text-align: left;
  background: #eee;
  position: relative;
  margin-bottom: 10px;
}

.returnbtn,
.more {
  display: inline-block;
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.returnbtn {
}
.more {
  float: right;
}
.contentC {
  padding: 10px;
  position: relative;
}
.talkTo {
  width: 80px;
  height: 40px;
  line-height: 40px;
  background: rgb(0 159 105);
  color: white;
  position: absolute;
  top: 20px;
  right: 10px;
  border-radius: 8px;
  cursor:pointer;
  z-index: 100;
}
.infoBar {
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  margin-left: 10px;
}
</style>