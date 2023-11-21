<script setup>
import { ref } from "vue";
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue";
import TheFooter from "./components/layout/TheFooter.vue";

const notifyAgain = ref(false);
const getNotifyAgain = () => {
  console.log("App.vue에서 수신");
  notifyAgain.value = !notifyAgain.value;
  console.log("notifyAgain 바뀜", notifyAgain.value);
};
</script>

<template>
  <div>
    <TheHeadingNavbar :notifyAgain="notifyAgain" />
    <main id="main">
      <router-view @getNotifyAgain="getNotifyAgain"></router-view>
    </main>
    <TheFooter />
  </div>
</template>

<style>
@import "./assets/css/indexstyles.css";
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&family=Roboto+Mono&display=swap");
</style>
