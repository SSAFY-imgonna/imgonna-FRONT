<script setup>
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue";
import TheFooter from "./components/layout/TheFooter.vue";
</script>

<template>
  <div>
    <TheHeadingNavbar />
    <router-view></router-view>
    <TheFooter />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&family=Roboto+Mono&display=swap");
</style>
