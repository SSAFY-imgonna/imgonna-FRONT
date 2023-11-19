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
  <div class="row">
    <h4>나의 여행 코스</h4>
    <h6>원하는 장소를 검색해 추가하세요</h6>
    <div>
      <div class="alist">
        <div
          class="card ms-0 mb-3 attraction-info"
          v-for="attraction in attractions"
          :key="attraction.contentId"
        >
          <div class="row g-0 col-lg-12" v-if="attraction">
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
