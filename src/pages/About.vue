<template>
    <div class="abtme">
        <UserCard @click='aboutme' :user='user'>me</UserCard>
        <div class="bottomarea">
            <div class="more">
                <div class="funcslot">收藏</div>
                <div class="funcslot">功能1</div>
                <div class="funcslot">功能2</div>
            </div>
            <div class="setup">设置</div>
        </div>
        
    </div>
    <router-view></router-view>
</template>
<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import UserCard from '../components/UserCard.vue'
let user = ref({
    name:'是我',
    uid:123456
})
let router = useRouter();
let aboutme = ()=>{
    router.push('/about/me');
}
</script>
<style scoped>
.abtme{
    position: relative;
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