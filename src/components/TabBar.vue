<template>
    <!-- 点击事件代理到容器上 -->
    <div class="bottomBar" @click='changeCurrent($event)' :style='{height:containerHeight}'>
        <div v-for='item in tabs' :key='item.name' :class="['tabBar',item.name==props.choosed?'isChoosed':'']">
            <!-- 需要传入type以及激活和普通两张图片 -->
            <div v-if="type=='img'" class="tabIcon">
                <img v-show='props.choosed!=item.name' src="" alt="">
                <img v-show='props.choosed==item.name' src="" alt="">
            </div>
            <!-- 使用iconFont的话，只需要改变颜色 -->
            <div v-if="type=='iconFont'" class="tabIcon">
                <i class='iconsetup icon iconfont' :class='item.icon'></i>
            </div>
            <div class="tabText" :style="{'line-height':type=='text'||type==''?containerHeight:''}">
                {{item.name}}
            </div>
            <!-- 将routerlink单独提出来，通过绝对定位覆盖整个tabBar，让视觉区域和操作区域吻合 -->
            <router-link :to='item.path' :data-name='item.name'></router-link>
        </div>
    </div>
</template>

<script setup>
import {ref,computed} from 'vue'

// choosed可以由父组件传入，由父组件事件改变当前选择的tab，例如左右滑动切换，tabs为具体的按钮项，包含name为文本，type为每个tabBar是文字，图片，iconfont，containerHeight为自定义高度；
const props = defineProps({
    choosed:String,
    tabs:Array,
    type:String,
    containerHeight:String
})

//如果需要组件自己也保持当前选中的tab则需要
// let currentTab = computed(()=>props.choosed)
// 通过computed来保持currentTab的响应性。

// emit事件用来通知父组件tab切换
const emit = defineEmits(['tabChange'])
const changeCurrent= (event)=>{
    // 由于router-link定位位于最上层，直接通过dataset获取名称
    let name = event.target.dataset.name;

    emit('tabChange',name);
}
</script>

<style scoped>
.bottomBar{
    width:100%;
    height:60px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    background: rgb(240,240,240);
    z-index: 555;
}
.bottomBar a{
    text-decoration: none;
    color:black;
    display: block;
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
}
.router-link-active {
    text-decoration: none;
}
.tabText{
    font-size: 14px;
}
.iconsetup{
    font-size: 20px;
}
.tabBar{
    width:25%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    border:1px solid transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor:pointer;
}
.isChoosed{
    color:#009f69
}
.tabBar img{
    width:50%;
    height:50%;

}
.tabBar:hover{
    border: 1px solid rgb(220,220,220);
}
</style>