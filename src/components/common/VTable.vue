<script setup>
defineProps({ attractions: array });
emit = defineEmits(["viewAttraction"]);
const viewAttraction = (attraction) => {
  emit(attraction);
};
</script>

<template>
  <table class="table table-hover">
    <thead>
      <tr class="text-center">
        <th scope="col">관광지명</th>
        <th scope="col">위치</th>
        <th scope="col">전화번호</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="text-center"
        v-for="attraction in attractions"
        :key="attraction.contentId"
        @click="viewAttraction(attraction)"
      >
        <th>{{ attraction.title }}</th>
        <td>{{ attraction.addr1 }}</td>
        <td>{{ attraction.tel }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
