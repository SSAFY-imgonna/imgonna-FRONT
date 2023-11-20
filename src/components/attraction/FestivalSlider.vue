<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, onMounted, watch, nextTick } from "vue";

// Import Swiper styles
import "swiper/css";

import { useRoute, useRouter } from "vue-router";
import { getFestivalList } from "@/api/attraction";

const route = useRoute();
const router = useRouter();

const { diaryNo } = route.params;

const festivals = ref();

onMounted(() => {
  getFestivals();
});

const getFestivals = () => {
  getFestivalList(
    ({ data }) => {
      festivals.value = data.items.item;
    },
    (error) => {
      festivals.value = error.data.response.body.items.item;
      console.log(festivals.value);
    }
  );
};

onMounted(() => {});

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};
</script>

<template>
  <!-- <nav>
    <a href="javascript:;" @click="handlePage(0)">tab 1</a>
    <a href="javascript:;" @click="handlePage(1)">tab 2</a>
    <a href="javascript:;" @click="handlePage(2)">tab 3</a>
  </nav>
  <div class="page_content">
    <div v-if="pageIdx === 0" class="page1">
      <div ref="mySwiperRef" class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
          <div class="swiper-slide">Slide 4</div>
          <div class="swiper-slide">Slide 5</div>
          <div class="swiper-slide">Slide 6</div>
          <div class="swiper-slide">Slide 7</div>
          <div class="swiper-slide">Slide 8</div>
          <div class="swiper-slide">Slide 9</div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
    <div v-if="pageIdx === 1" class="page2">
      <h1>page2</h1>
    </div>
    <div v-if="pageIdx === 2" class="page3">
      <h1>page3</h1>
    </div>
  </div> -->

  <section id="events" class="events">
    <div class="container-fluid" data-aos="fade-up">
      <div class="section-header">
        <h2>이번달 축제</h2>
        <!-- <p>Share <span>Your Moments</span> In Our Restaurant</p> -->
      </div>

      <swiper
        :slides-per-view="3"
        :space-between="50"
        :modules="modules"
        navigation
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        ...
      </swiper>

      <!-- <div class="slides-3 swiper" data-aos="fade-up" data-aos-delay="100">
        <div class="swiper-wrapper">
          <div class="swiper-slide event-item d-flex flex-column justify-content-end">
            <h3>Custom Parties</h3>
            <div class="price align-self-start">$99</div>
            <p class="description">
              Quo corporis voluptas ea ad. Consectetur inventore sapiente ipsum voluptas eos omnis
              facere. Enim facilis veritatis id est rem repudiandae nulla expedita quas.
            </p>
          </div>

          <div class="swiper-slide event-item d-flex flex-column justify-content-end">
            <h3>Private Parties</h3>
            <div class="price align-self-start">$289</div>
            <p class="description">
              In delectus sint qui et enim. Et ab repudiandae inventore quaerat doloribus. Facere
              nemo vero est ut dolores ea assumenda et. Delectus saepe accusamus aspernatur.
            </p>
          </div>

          <div class="swiper-slide event-item d-flex flex-column justify-content-end">
            <h3>Birthday Parties</h3>
            <div class="price align-self-start">$499</div>
            <p class="description">
              Laborum aperiam atque omnis minus omnis est qui assumenda quos. Quis id sit quibusdam.
              Esse quisquam ducimus officia ipsum ut quibusdam maxime. Non enim perspiciatis.
            </p>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div> -->
    </div>
  </section>
</template>

<style scoped>
/*--------------------------------------------------------------
# Events Section
--------------------------------------------------------------*/
.events .container-fluid {
  padding: 0;
}

.events .event-item {
  background-size: cover;
  background-position: cente;
  min-height: 600px;
  padding: 30px;
}

@media (max-width: 575px) {
  .events .event-item {
    min-height: 500px;
  }
}

.events .event-item:before {
  content: "";
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  inset: 0;
}

.events .event-item h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #fff;
  position: relative;
}

.events .event-item .price {
  color: #fff;
  border-bottom: 2px solid var(--color-primary);
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 15px;
  position: relative;
}

.events .event-item .description {
  margin-bottom: 0;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
}

@media (min-width: 1200px) {
  .events .swiper-slide-active + .swiper-slide {
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.5);
    z-index: 1;
  }
}

.events .swiper-pagination {
  margin-top: 20px;
  position: relative;
}

.events .swiper-pagination .swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background-color: #d1d1d7;
  opacity: 1;
}

.events .swiper-pagination .swiper-pagination-bullet-active {
  background-color: var(--color-primary);
}
/* style="background-image: url(assets/img/events-3.jpg)" */
</style>
