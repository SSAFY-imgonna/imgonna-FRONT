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
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: var(--swiper-navigation-top-offset, 50%);
  width: calc(var(--swiper-navigation-size) / 44 * 27);
  height: var(--swiper-navigation-size);
  margin-top: calc(0px - (var(--swiper-navigation-size) / 2));
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #74b359 !important;
}

.swal2-shown {
  overflow: unset !important;
  padding-right: 0px !important;
}
</style>
