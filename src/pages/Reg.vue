<template>
<!-- <teleport to='body'> -->
    <div class='fullPageContainer'>
        <div class="regc">
            <div class="labelc">
                <span>注 册</span>
                <div class='gotoLogin' @click='gotoLogin'>登录</div>
            </div>
            <div class="inputc">
                <input type="text" placeholder="用户名、手机号、邮箱">
            </div>
            <div class="inputc">
                <input type="text" placeholder="密码">
            </div>
            <div class="inputc">
                <input type="text" placeholder="确认密码">
            </div>
            <button class='regbtn'>注册</button>
        </div>
    </div>
<!-- </teleport> -->
    
</template>
<script setup>
import {useRouter} from 'vue-router';
let router = useRouter();
let gotoLogin = ()=>{
    router.push('/login');
}
</script>
<style scoped>
.regc{
    width:500px;
    height:420px;
    background: rgb(252, 252, 252);
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding:30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.labelc{
    position: relative;
    height:60px;
    line-height: 60px;
    box-sizing: border-box;
    border-bottom: 2px solid;
}
.gotoLogin{
    display: inline-block;
    color: rgb(31, 122, 31);
    box-sizing: border-box;
    border-bottom:1px solid transparent;
    cursor:pointer;
    position:absolute;
    height:40px;
    line-height: 40px;
    right:0;
    top:10px;
}
.gotoLogin:hover{
    border-bottom: 1px solid #999;
}
.inputc{
    margin:10px 0;
}
input {
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
.regbtn{
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  box-sizing: border-box;
  
  border-radius: 5px;
  color:black;
  background: rgb(252, 252, 252);
  border:2px solid #999;
  cursor: pointer;
}
.regbtn:hover{
    color: white;
    border:none;
    background: rgb(20, 177, 6);
}
</style>