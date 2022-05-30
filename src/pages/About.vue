<template>
    <div class="abtme">
        <div class="shortcut" @click='aboutme'>
            <div class="me" >me</div>
            <div class="uinfo">
                <div class="un">myusername</div>
                <div class="uid">uid:123456</div>
            </div>
        </div>
        <div class="bottomarea">
            <div class="more">
                <div class="funcslot">收藏</div>
                <div class="funcslot">功能1</div>
                <div class="funcslot">功能2</div>
            </div>
            <div class="setup">设置</div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script setup>
import {useRouter} from 'vue-router';
let router = useRouter();
let aboutme = ()=>{
    router.push('/about/me');
}
</script>
<style scoped>
.abtme{
    position: relative;
}
.shortcut{
    position: relative;
    width:100%;
    height:100px;
    cursor:pointer;
}
.me{
    position: absolute;
    top:10px;
    left:10px;
    width:80px;
    height:80px;
    line-height: 80px;
    background: #009f69;
    color:white;
    font-weight: 600;
    font-size: 20px;
}
.uinfo{
    display: inline-block;
    position: absolute;
    top:10px;
    left:100px;
    text-align: left;
}
.uinfo>div{
    line-height: 40px;
}
.un{
    font-size: 18px;
}
.uid{
    font-size: 15px;
    color:#777;
}
.bottomarea{
    position: relative;
}
.bottomarea > div{
    width:100%;
    box-sizing: border-box;
    margin:10px 0;
    background: rgb(240,240,240);
    line-height: 40px;
    cursor:pointer; 
    text-align: left;
}
.funcslot{
    padding: 10px 0px;
    box-sizing: border-box;
    padding-left: 10px;
}
.funcslot:nth-last-child(n+2){
    border-bottom: 1px solid #aaa;
}
.setup{
    box-sizing: border-box;
    padding:10px;
}
</style>