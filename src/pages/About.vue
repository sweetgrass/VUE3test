<template>
    <div class="abtme">
        <UserCard @click='aboutme' :user='user'><template v-slot:uname>me</template><template v-slot:btn><div class='logOut' @click.stop='logout'>退出</div></template></UserCard>
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
import {useStore} from 'vuex';
import UserCard from '../components/UserCard.vue'
let user = ref({
    name:'是我',
    uid:123456
})
let store = useStore();
let router = useRouter();
let logout = ()=>{
    console.log('logout......')
    store.commit('logOut','')
    router.push('/login');
}
let aboutme = ()=>{
    router.push('/about/me');
}
</script>
<style scoped>
.abtme{
    position: relative;
}
.logOut{
    width: 80px;
    height: 40px;
    line-height: 40px;
    background: #ef7474;
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    border-radius: 5px;
    font-size: 14px;
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