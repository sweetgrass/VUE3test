<template>
  <div class="singleMsg" :class="[props.isSelf ? 'isMe' : '']">
    <div class="head">{{ props.msg.user }}</div>
    <div class="mst">
      <div class="time">
        <span>{{ props.msg.time }}</span>
      </div>
      <div class="msgc">
        <div class="msgtxt">{{ props.msg.text }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  isSelf: Boolean,
  msg: Object,
});
</script>
<style scoped>
.singleMsg {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.isMe {
  flex-direction: row-reverse;
}
.isMe .time {
  flex-direction: row-reverse;
}
.isMe .msgc {
  flex-direction: row-reverse;
}
.mst {
  width: 80%;
  margin: 0 10px 10px 10px;
}
.head {
  width: 30px;
  height: 30px;
  background: rgb(240, 200, 200);
  box-sizing: border-box;
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
}
.time {
  margin: 0;
  padding: 0;
  height: 30px;
  font-size: 8px;
  display: flex;
}
.time > span {
  display: block;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  padding: 0 10px;
  border: 1px solid rgb(240, 240, 240);
  border-radius: 15px;
}
.msgc {
  display: flex;
}
.msgtxt {
  display: inline-block;
  background: rgb(245, 245, 245);
  margin: 0;
  margin-top: 5px;
  padding: 10px;
  border-radius: 10px;
  font-size: 15px;
  line-height: 20px;
  text-align: left;
}
.isMe .msgtxt {
  background: #1ec58d;
}
</style>