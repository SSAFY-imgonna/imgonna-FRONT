<script setup>
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
    <td>{{ inquiry.id }}</td>
    <td>{{ inquiry.createdTime }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
