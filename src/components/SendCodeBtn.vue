<template>
  <button @click='sendCode' :disabled='props.isSending'>{{btnText}}</button>
</template>
<script setup>
import { ref, computed} from "vue";
//countTime自定义倒计时时间
//isSending可以将倒计时控制器交给父组件，以便进行错误处理
let props = defineProps({
    countTime:Number,
    isSending:Boolean
})
let emit = defineEmits(['RequestCode']);
let intervalID = '';
let isSending = ref(false);
let defaultTxt = '发送验证码';
let btnText = ref(defaultTxt);
let cnt = props.countTime||60;
let sendCode = ()=>{
    emit('RequestCode',1);
    intervalID = setInterval(()=>{
        if(cnt>=0){
            btnText.value = cnt+'秒后可重发';
            cnt--
        }
        else{
            cnt = 60;
            btnText.value = defaultTxt;
            clearInterval(intervalID);
            emit('RequestCode',2);
        }
    },1000)
}
</script>
<style scoped>
button {
  display: block;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  padding: 0 10px;
  font-size: 14px;
  cursor: pointer;
  background:white;
  border:none;
}
</style>