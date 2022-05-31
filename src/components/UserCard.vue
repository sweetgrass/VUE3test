<template>
    <div class="shortcut" @click='aboutme'>
            <div class="me" ><slot></slot></div>
            <div class="uinfo">
                <div class="un">{{props.user.name}}</div>
                <div class="uid">{{props.user.uid}}</div>
            </div>
        </div>
</template>
<script setup>
let props = defineProps({
    user:Object
})
</script>
<style scoped>
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
    text-align: center;
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
</style>