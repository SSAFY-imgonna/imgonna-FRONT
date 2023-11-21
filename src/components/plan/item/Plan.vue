<script setup>
defineProps({
  attraction: Object,
});
console.log(attraction);
</script>

<template>
  <div class="row g-0 col-lg-12" v-if="attraction" draggable="true">
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
</template>

<style scoped></style>
