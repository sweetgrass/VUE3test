<template>
  <teleport to="body">
    <div class="fullPageContainer lgc">
      <div class="loginContainer">
        <div class="head">
          <div class="banner">
            <div
              class="logMode"
              :class="{ selectedMode: mode == 'acc' }"
              @click="select(1)"
            >
              账号登录
            </div>
            <div
              class="logMode"
              :class="{ selectedMode: mode == 'tel' }"
              @click="select(2)"
            >
              手机登录
            </div>
          </div>
          <div class="regBtn" @click="gotoReg">注册账号</div>
        </div>
        <keep-alive>
          <div class="iac">
            <div v-show="mode == 'acc'" class="inputArea">
              <div class="inputWrapper">
                <span class='valInfo' :class="[unTextStatus?'okText':'errorText']">{{unText}}</span>
                <input type="text" placeholder="用户名、手机号、邮箱" v-model='userName' @blur="valiUN"/>
              </div>
              <div class="inputWrapper">
                <span class="valInfo">{{passText}}</span>
                <input type="text" placeholder="请输入密码" v-model='passwd' @blur="valiPass" />
              </div>
            </div>
            <div v-show="mode == 'tel'" class="inputArea">
              <div class="inputWrapper">
                <input type="text" placeholder="请输入手机号" v-model="mbnumber" @blur="valiMB"/>
                <SendCodeBtn class='sendCode' :isSending='sendStatus' :countTime='10' @RequestCode='requestCode'></SendCodeBtn>
              </div>
              <div class="inputWrapper">
                <span class="valInfo" :class="[codeTextStatus?'okText':'errorText']">{{codeText}}</span>
                <input type="text" placeholder="请输入验证码" v-model="logincode" @blur="valiCode"/>
              </div>
            </div>
          </div>
        </keep-alive>

        <div class="submitArea">
          <div class="login" @click.prevent='loginTo'>登录</div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";
let store = useStore();
import SendCodeBtn from '../components/SendCodeBtn.vue'
let router = useRouter();
let mode = ref("acc");
let gotoReg = () => {router.push('/reg')};
let select = (mn) => {
  let md = mn == 1 ? "acc" : "tel";
  if (mode.value != md) {
    mode.value = md;
  }
};
// input validate
let userName = ref('');
let unText = ref('');
let unTextStatus = ref(true);
const valiUN = ()=>{
  let unok = false;
  const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  const mobileReg = /^1[0-9]{10}$/;
  let un = userName.value;
  unText.value = '正在验证...'
  if(un.includes('@')){
    unok = emailReg.test(un);
    unText.value = unok?'ok':'邮箱地址有误！'
  }
  else if(!isNaN(un*1)){
    unok = mobileReg.test(un);
    unText.value = unok?'ok':'手机号有误！'
  }
  else{
    unok = un.length>=6&&un.length<=16;
    unText.value = unok?'ok':'用户名长度不合格！'
  }
  unTextStatus.value = unok;
  return unok;
}
let passwd = ref('');
let passText = ref('');
const valiPass = ()=>{
  passText.value = '正在验证...'
  setTimeout(()=>{passText.value = 'ok'},1000)
}

//input validate 2
let mbnumber = ref('');
let logincode = ref('');
let codeText = ref('');
let codeTextStatus = ref(true);
const valiMB = ()=>{
  let mbok = false;
  let mb = mbnumber.value;
  const mobileReg = /^1[0-9]{10}$/;
  mbok = mobileReg.test(mb);
  codeText.value = mbok?'ok':'手机号有误！'
  codeTextStatus.value = mbok
  return mbok;
}
const valiCode = ()=>{
  let codeok = false;
  let code = logincode.value;
  const codetst = /^[0-9]{6}$/;
  codeok = codetst.test(code);
  codeText.value = codeok?'ok':'验证码格式不正确'
  codeTextStatus.value = codeok;
  return codeok;
}
let sendStatus = ref(false);
let requestCode = (type)=>{
    if(type == 1){
        sendStatus.value = true;
    }
    else{
        sendStatus.value = false;
    }
    
}

let loginTo = async ()=>{
  let isok = false;
  if(mode.value == 'acc'){
    isok = valiUN();
  }
  else{
    isok = valiMB()&&valiCode();
  }
  console.log(isok);
  if(!isok){return}
  let res = await store.dispatch('login',{un:userName.value,up:passwd.value});
  if(res == 'ok'){
    router.push('/home');
  }
  console.log(res);
}
</script>
<style scoped>
.lgc {
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginContainer {
  width: 60%;
  height: 420px;
  box-sizing: border-box;
  border-radius: 10px;
  background: rgb(252, 252, 252);
  padding: 30px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
}
.head {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
}
.banner {
  width: 60%;
  height: 30px;
}
.logMode {
  font-size: 16px;
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
  box-sizing: border-box;
  border: 2px solid transparent;
}
.selectedMode {
  border-bottom: 2px solid rgb(31, 122, 31);
}
.regBtn {
  cursor: pointer;
  color: rgb(31, 122, 31);
  box-sizing: border-box;
  height: 30px;
}
.regBtn:hover {
  border-bottom: 1px solid #aaa;
}
.iac {
  width: 100%;
}
.inputArea {
  width: 100%;
  height: 200px;
}
.inputWrapper {
  height: 60px;
  margin: 20px 0;
  position:relative;
}
.valInfo{
    display: block;
    position: absolute;
    right: 0;
    line-height: 60px;
    font-size: 12px;
}
.okText{
  color:rgb(55, 185, 55)
}
.errorText{
  color:rgb(189, 94, 94)
}
.sendCode{
    position: absolute;
    right: 0;
    top: 0;
    margin-top: 10px;
    background: rgb(252, 252, 252);
}
.inputArea input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  border: none;
  border-bottom: 1px solid #999;
  background: rgb(252, 252, 252);
  outline: none;
  padding: 0 1em;
}
.submitArea {
  width: 100%;
  height: 60px;
}
.login {
  width: 80%;
  height: 40px;
  line-height: 40px;
  margin: 10px 10%;
  text-align: center;
  box-sizing: border-box;
  border-radius: 5px;
  color: white;
  background: rgb(20, 177, 6);
  cursor: pointer;
}
</style>