<template>
  <!-- <teleport to="body"> -->
    <div class="fullPageContainer">
      <suspense>
        <div classs="chatboxcontainer">
          <div class="chatBoxTop">
            <div class="close" @click="returnTo">返回</div>
            <div class="name">{{uname}}</div>
          </div>
          <div v-if='!listOk'>正在获取...</div>
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
                @keydown.enter="sendMsg"
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
import { ref, onBeforeMount, onUpdated, onMounted, computed} from "vue";
import { useRouter } from "vue-router";
import {useStore} from 'vuex';
let router = useRouter();
let store = useStore();

const props = defineProps({
  name: String,
});


//进入页面时获取历史消息列表
let uid = router.currentRoute.value.params.uid;
let msHistory = computed(()=>{return store.state[uid];})
let uname = ref('');
//用来判断聊天记录是否加载完
let listOk = ref(false)
onBeforeMount(async () => {
  uname.value = uid;
  let tp = await store.dispatch('getmslist',uid);
  if(tp=='success'){
    listOk.value = true;
    
  }
});

//发送消息
let typing = ref(false);
let mstext = ref("");
let chatRef = ref([]);
const setChatRef = (el) => {
  chatRef.value.push(el);
};
let scrollTo = function () {
  //先判断是否加载完成，否则会出错
  if(!listOk||msHistory.value.length==0){
    return
  }
  else{
    let rf = chatRef.value[0];
    if(rf.hasChildNodes()){
      rf.lastElementChild.scrollIntoView();
    }
  }
  
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



onUpdated((to, from) => {
  scrollTo();
});

let sendMsg = async() => {
  let now = new Date();
  let msg = {
    user: "me",
    to:uid,
    text: mstext.value,
    sendTime:now.getFullYear()+'/'+now.getMonth()+'/'+now.getDay()+'-'+(now+'').split(' ')[4],
    time: "发送中...",
  };
  // msHistory.value.push(msg);
  typing.value = false;
  mstext.value = "";
  store.dispatch('sendmsg',msg);
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
  height: 60px;
  line-height: 60px;
}
.chatBox {
  margin-bottom: 60px;
  height: 88vh;
  overflow-y: scroll;
}
.close {
  width: 60px;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  cursor: pointer;
}
.name {
  width: 100%;
  text-align: center;
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