<script setup>
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue";
import TheFooter from "./components/layout/TheFooter.vue";
</script>

<template>
  <div>
    <TheHeadingNavbar />
    <main id="main">
      <router-view></router-view>
    </main>
    <TheFooter />
  </div>
</template>

<style>
@import "./assets/css/indexstyles.css";
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&family=Roboto+Mono&display=swap");
</style>
