<template>
  <teleport to="body">
    <div class="fullPageContainer">
      <div class='top'>
        <div class="returnto" @click='returntoabout'>返回</div>
        <div class='label'>个人信息</div>
      </div>
      <div class="ui">
        <div class="each">头像</div>
        <div class="each">名字</div>
        <div class="each">uid</div>
        <div class="each">二维码</div>
        <div class="each">其他</div>
      </div>
    </div>
  </teleport>
</template>
<script setup>
import {useRouter} from 'vue-router';
let router = useRouter();
let returntoabout = ()=>{
    router.push('/about');
}
</script>
<style scoped>
.top{
    width:100%;
    height:60px;
    line-height: 60px;
    position:relative;
    background: #eee;
}
.returnto{
    position:absolute;
    top:0;
    left:0;
    cursor:pointer;
    width:100px;
    text-align: center;
}
.label{
    text-align: center;
}
.each{
    width:100%;
    line-height: 60px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    cursor:pointer;
    padding:0 20px;
}
</style>