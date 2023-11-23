<script setup>
const imageUrl = new URL("@/assets/img/springboot/upload/", import.meta.url).href;
defineProps({ inquiry: Object });
</script>

<template>
  <tr class="text-center">
    <th scope="row">{{ inquiry.inquiryNo }}</th>
    <td class="text-start">
      <router-link
        :to="{ name: 'qna-view', params: { qnaNo: inquiry.inquiryNo } }"
        class="article-title link-dark"
      >
        {{ inquiry.title }}
      </router-link>
    </td>
    <td>
      <i v-if="!inquiry.photo" class="bi bi-person-circle me-2"></i>
      <img
        v-else
        :src="`${imageUrl}/${inquiry.photo}`"
        alt=""
        width="25"
        class="rounded-circle img-fluid me-1"
      />
      {{ inquiry.id }}
    </td>
    <td>{{ inquiry.createdTime }}</td>
  </tr>
</template>

<style scoped>
* {
  font-family: "Nanum Gothic", sans-serif !important;
}
a {
  text-decoration: none;
}
</style>
