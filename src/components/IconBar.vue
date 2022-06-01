<template>
  <div class="alc">
    <div class="iconC"><slot name="icon"></slot></div>
    <div class="textC" :class='[noBorder?"last":""]'>{{ bartext }}</div>
    <div v-if='hasBtn' class="operation" @click.stop='emit("btnClick",uid)'>{{btnText}}</div>
  </div>
</template>
<script setup>
let props = defineProps({
  noBorder: Boolean,
  bartext: String,
  uid:Number,
  btnText:String,
  hasBtn:Boolean
});
const emit = defineEmits(['btnClick'])

</script>
<style scoped>
.alc {
    width:100%;
    height:52px;
    position:relative;
    overflow: hidden;
    cursor:pointer;
}
.iconC {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  background: rgb(48, 168, 238);
  position: absolute;
  top:5px;
  left:5px;
}
.textC{
    float:left;
    box-sizing: border-box;
    width:100%;
    line-height: 50px;
    border-bottom: 1px solid #eee;
    text-align: left;
    position: absolute;
    top:0;
    left:60px;
}
.last{
    border-bottom: 1px solid transparent;
}
.operation{
  width:120px;
  height:40px;
  line-height: 40px;
  background:rgb(0 159 105);
  color:white;
  position:absolute;
  right:10px;
  top:5px;
  border-radius: 5px;
  display: none;
}
.alc:hover > .operation{
  display: block;
}
</style>