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

<style scoped></style>
