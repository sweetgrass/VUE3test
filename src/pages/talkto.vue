<template>
  <!-- <teleport to="body"> -->
    <div class="fullPageContainer">
      <suspense>
        <div classs="chatboxcontainer">
          <div class="chatBoxTop">
            <div class="close" @click="returnTo">返回</div>
            <div class="name">{{uname}}</div>
          </div>
          <div class="chatBox" :ref="setChatRef">
            <SingleMessage
              v-for="ms in msHistory"
              :key="ms.time"
              :isSelf="ms.user == 'me'"
              :msg="ms"
            ></SingleMessage>
          </div>
          <div class="insertBox">
            <div class="voiceInsert"><button>音</button></div>
            <div class="inputBox">
              <input
                type="text"
                class="msinput"
                @focus="checkType(1)"
                @blur="checkType(2)"
                v-model="mstext"
              />
              <div class="btnGroup">
                <div v-show="!typing" class="circle meme">M</div>
                <div v-show="!typing" class="circle file">+</div>
                <div v-show="typing" class="send" @click="sendMsg">发送</div>
              </div>
            </div>
          </div>
        </div>
      </suspense>
    </div>
  <!-- </teleport> -->
</template>
<script>
export default{
  name:'talkto'
}
</script>
<script setup>
import SingleMessage from "../components/SingleMessage.vue";
import { ref, defineProps, onBeforeMount, onUpdated, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getHistoryByUID } from "../api/index.js";
let router = useRouter();

const props = defineProps({
  name: String,
});
let typing = ref(false);
let mstext = ref("");
let chatRef = ref([]);
const setChatRef = (el) => {
  chatRef.value.push(el);
};

let checkType = (t) => {
  if (t == 1) {
    typing.value = true;
  } else if (t == 2) {
    mstext.value == "" ? (typing.value = false) : "";
  } else {
  }
};
let returnTo = function () {
  router.push("/message");
};
let msHistory = ref({});
let scrollTo = function () {
  let rf = chatRef.value[0];
  rf.lastElementChild.scrollIntoView();
};
let uname = ref('');
onBeforeMount(async () => {
  uname.value = router.currentRoute.value.params.uid;
  let tp = await getHistoryByUID(uname.value);
  msHistory.value = tp.messages;
});
onUpdated((to, from) => {
  scrollTo();
});

let sendMsg = () => {
  let msg = {
    user: "me",
    text: mstext.value,
    time: "发送中...",
  };
  msHistory.value.push(msg);
  typing.value = false;
  mstext.value = "";
};
</script>
<style scoped>
.chatboxContainer {
  position: relative;
}
.chatBoxTop {
  width: 100%;
  height: 6vh;
  background: rgb(245, 245, 245);
  position: relative;
}
.chatBox {
  margin-bottom: 60px;
  height: 88vh;
  overflow-y: scroll;
}
.close {
  width: 60px;
  height: 60px;
  line-height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  cursor: pointer;
}
.name {
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
}
.insertBox {
  width: 100%;
  height: 6vh;
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgb(245, 245, 245);
  display: flex;
  justify-content: center;
  align-items: center;
}
.voiceInsert {
  width: 10%;
  height: 40px;
  text-align: center;
}
.voiceInsert button {
  display: block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid rgb(150, 150, 150);
  margin: auto;
  cursor: pointer;
}
.inputBox {
  width: 90%;
  height: 40px;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.msinput {
  display: block;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid rgb(250, 250, 250);
  width: 70%;
  height: 40px;
  padding: 0 1em;
}
.btnGroup {
  width: 30%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.circle {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 1px solid rgb(150, 150, 150);
  cursor: pointer;
}
.file {
  font-size: 30px;
  line-height: 35px;
}
.send {
  width: 90%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #009f69;
  color: white;
  border-radius: 5px;
}
</style>