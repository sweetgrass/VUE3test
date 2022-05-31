<template>
    <div class='msbar'>
        <div class="barleft">
            <div class='uname'>{{props.item.username}}</div>
        </div>
        <div class="barright">
            <div class="spinfo">
                <div class="un">{{props.item.username}}</div>
                <div class="time">{{props.item.latestMessage.time}}</div>
            </div>
            <div class="msg">{{props.item.latestMessage.text.substr(0,20)}}</div>
        </div>
        
    </div>
</template>
<script setup>

let props = defineProps({
    item:Object
})
</script>
<style scoped>
.msbar{
    width:100%;
    height:60px;
    position:relative;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    margin:10px 0;
    cursor:pointer;
}
.msbar *{
    box-sizing: border-box;
}
.barleft{
    width:40px;
    height:40px;
    line-height: 40px;
    font-size: 18px;
    border-radius: 5px;
    background: #eee;
    position: relative;
}
.barright{
    height:100%;
    border-bottom:1px solid #eee;
    width:100%;
    padding:0 10px;
    position: relative;
}
.spinfo{
    position:relative;
    height:20px;
    width:100%;
}
.spinfo>div{
    display: inline-block;
    height:20px;
    line-height: 20px;
}
.un{
    position: absolute;
    top:0;
    left:0;
    font-size: 18px;
}
.time{
    position:absolute;
    top:0;
    right:0;
    font-size: 14px;
    color:#999;
}
.msg{
    width:100%;
    height:40px;
    text-align: left;
    color:#666;
    line-height: 40px;
}
</style>