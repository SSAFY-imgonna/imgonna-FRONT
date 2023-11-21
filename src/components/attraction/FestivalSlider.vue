<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, onMounted, watch, nextTick } from "vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

import { useRoute, useRouter } from "vue-router";
import { getFestivalList } from "@/api/attraction";

const progressCircle = ref(null);
const progressContent = ref(null);
const onAutoplayTimeLeft = (s, time, progress) => {
  progressCircle.value.style.setProperty("--progress", 1 - progress);
  progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
};

const route = useRoute();
const router = useRouter();

const { diaryNo } = route.params;

const festivalList = ref([]);

onMounted(() => {
  getFestivals();
});

const getFestivals = () => {
  getFestivalList(
    ({ data }) => {},
    (error) => {
      // festivals.value = error.data.response.body.items.item;
      let items = error.data.response.body.items.item;
      for (var i = 0; i < items.length; i += 3) {
        let arr = [];
        arr.push(items[i]);
        arr.push(items[i + 1]);
        arr.push(items[i + 2]);
        arr.push(items[i + 3]);
        festivalList.value.push(arr);
      }
      console.log(festivalList.value);
    }
  );
};

onMounted(() => {});

const onSwiper = (swiper) => {
  // console.log(swiper);
};
const onSlideChange = () => {
  // console.log("slide change");
};
</script>

<template>
  <section id="events" class="events">
    <div class="container-fluid" data-aos="fade-up">
      <swiper
        :spaceBetween="30"
        :centeredSlides="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        :modules="[Autoplay, Pagination, Navigation]"
        @autoplayTimeLeft="onAutoplayTimeLeft"
        class="mySwiper"
      >
        <swiper-slide v-for="festivals in festivalList">
          <div class="row">
            <template v-for="festival in festivals">
              <div class="col-3">
                <div
                  :style="{
                    backgroundImage:
                      'url(' + (festival.firstimage ? festival.firstimage : '/no_image.png') + ')',
                  }"
                  class="swiper-slide event-item d-flex flex-column justify-content-end"
                >
                  <h3>{{ festival.title }}</h3>
                  <h3 class="align-self-start">{{ festival.addr1 }}</h3>
                  <p class="description">
                    {{ festival.eventstartdate }} - {{ festival.eventenddate }}
                  </p>
                </div>
              </div>
            </template>
          </div>
        </swiper-slide>
        <template #container-end>
          <div class="autoplay-progress">
            <svg viewBox="0 0 48 48" ref="progressCircle">
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref="progressContent"></span>
          </div>
        </template>
      </swiper>
    </div>
  </section>
</template>

<style scoped>
.autoplay-progress {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #74b359;
}

.autoplay-progress svg {
  --progress: 0;
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
  stroke-width: 4px;
  stroke: #74b359;
  fill: none;
  stroke-dashoffset: calc(125.6 * (1 - var(--progress)));
  stroke-dasharray: 125.6;
  transform: rotate(-90deg);
}

h3.align-self-start {
  font-size: 10pt !important;
}
.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: auto;
  position: relative;
  transition-property: transform;
  display: block;
}

section {
  overflow: hidden;
  padding: 20px 0;
}
</style>
