<template>
  <!-- <teleport to='body'> -->
  <div class="fullPageContainer">
    <UserCard :user="user">{{ user.uid }}</UserCard>
  </div>
  <!-- </teleport> -->
</template>
<script>
export default{
    name:'friend'
}
</script>
<script setup>
import UserCard from "../components/UserCard.vue";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
let user = ref({
  name: "test",
  uid: "",
});
onBeforeMount(() => {
  let uid = router.currentRoute.value.params.uid;
  user.value.uid = uid;
});
</script>