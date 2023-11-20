<script setup>
import { ref, watch, onMounted } from "vue";
import draggable from "vuedraggable";
import Plan from "./item/Plan.vue";
const attractions = ref();

const props = defineProps({ attractions: Array });

watch(
  () => props.attractions,
  () => {
    attractions.value = props.attractions;
  },
  { deep: true }
);

// onMounted(() => {
//   attractions.value = props.attractions;
// });

const updateAttractions = (oldIndex, newIndex) => {
  // 순서 변경
};
</script>

<template>
  <div class="row">
    <h4>나의 여행 코스</h4>
    <h6>원하는 장소를 검색해 추가하세요</h6>
    <div>
      <div class="alist">
        <draggable
          v-model="attractions"
          item-key="index"
          tag="ul"
          class="card ms-0 mb-3 attraction-info"
        >
          <template #item="{ element: attraction }">
            <!-- <div
              class="card ms-0 mb-3 attraction-info"
              v-for="attraction in attractions"
              :key="attraction.contentId"
              :attraction="element"
            > -->
            <Plan :attraction="attraction" :index="attractions.indexOf(attraction)" />
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<style scoped>
h4 {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 10px;
}
h6 {
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 20px;
}
* {
  font-family: "Nanum Gothic", sans-serif !important;
}

.alist {
  /* position: absolute; */
  /* top: 150px; */
  /* bottom: 300px; */
  overflow-y: scroll;
  max-height: 740px;
}

.overflow-auto {
  overflow: auto !important;
}

.card {
  width: 90%;
}
</style>
