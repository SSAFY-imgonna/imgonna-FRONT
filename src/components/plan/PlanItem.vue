<script setup>
import { ref, watch } from "vue";

const attractions = ref();

const props = defineProps({ attractions: Array });

watch(
  () => props.attractions,
  () => {
    attractions.value = props.attractions;
  },
  { deep: true }
);
</script>

<template>
  <div style="height: 500px">
    <h3>여행 코스</h3>
    <div class="alist overflow-auto">
      <div
        class="card ms-0 mb-3 attraction-info"
        v-for="attraction in attractions"
        :key="attraction.contentId"
        style="max-width: 540px"
      >
        <div class="row g-0" v-if="attraction">
          <div class="col-md-4">
            <img
              v-if="attraction.firstImage && attraction.firstImage.length > 0"
              :src="attraction.firstImage"
              class="img-fluid rounded-start"
              alt="..."
            />
            <img
              v-else-if="attraction.firstImage2 && attraction.firstImage2.length > 0"
              :src="attraction.firstImage"
              class="img-fluid rounded-start"
              alt="..."
            />
            <img v-else src="/img/no_image.png" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                <b>{{ attraction.title }}</b>
              </h5>
              <p class="card-text">{{ attraction.addr1 }} {{ attraction.addr2 }}</p>
              <!-- <p class="card-text">
                            <small class="text-body-secondary">{{ attraction.tel }}</small>
                          </p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alist {
  position: absolute;
  top: 150px;
  bottom: 300px;
  overflow-y: scroll;
}

.overflow-auto {
  overflow: auto !important;
}

.card {
  width: 80%;
}
</style>
