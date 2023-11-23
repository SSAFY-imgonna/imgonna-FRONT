<script setup>
const imageUrl = new URL("@/assets/img/springboot/upload/", import.meta.url).href;

import { useRouter } from "vue-router";
const router = useRouter();

const { diary } = defineProps({ diary: Object });
</script>

<template>
  <div class="col-lg-4 col-md-6">
    <div class="item">
      <router-link :to="{ name: 'diary-view', params: { diaryNo: diary.diaryNo } }">
        <img
          class="card-img"
          v-if="diary.fileInfos.length > 0"
          alt=""
          :src="`${imageUrl}/${diary.fileInfos[0].saveFolder}/${diary.fileInfos[0].saveFile}`"
        />
        <img v-else alt="" class="card-img" src="/img/no_image.png" />
      </router-link>
      <span class="category">{{ diary.contentTypeId }}</span>
      <h6>
        <i v-if="!diary.photo" class="bi bi-person-circle"></i>
        <img
          v-else
          :src="`${imageUrl}/${diary.photo}`"
          alt=""
          width="30"
          class="rounded-circle img-fluid"
        />
        {{ diary.id }}
      </h6>
      <h4>
        <span style="font-weight: 600">{{ diary.title }}</span>
      </h4>
      <ul>
        <li>
          관광지명: <span>{{ diary.attraction }}</span>
        </li>
        <li>
          여행일: <span>{{ diary.travelTime }}</span>
        </li>
        <li class="emotion">
          만족도:
          <span v-if="diary.emotion == 'fun'"><i class="bi bi-emoji-grin"></i></span>
          <span v-else-if="diary.emotion == 'great'"><i class="bi bi-emoji-smile"></i></span>
          <span v-else-if="diary.emotion == 'soso'"><i class="bi bi-emoji-neutral"></i></span>
          <span v-else-if="diary.emotion == 'bad'"><i class="bi bi-emoji-frown"></i></span>
          <span v-else-if="diary.emotion == 'angry'"><i class="bi bi-emoji-angry"></i></span>
        </li>
      </ul>
      <div class="main-button">
        <router-link :to="{ name: 'diary-view', params: { diaryNo: diary.diaryNo } }"
          >자세히보기</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Nanum Gothic", sans-serif !important;
}
.emotion i {
  font-size: 13pt;
}

ol,
ul {
  padding-left: 0;
}

a {
  text-decoration: none !important;
}

img.card-img {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.section-heading h3 {
  /* font-size: 30px; */
  font-weight: 700;
  text-transform: capitalize;
  margin-top: 20px;
  line-height: 56px;
}
/*
---------------------------------------------
Global Styles
---------------------------------------------
*/
html,
body {
  font-family: "Poppins", sans-serif;
}

::selection {
  background: #0071f8;
  color: #fff;
}

::-moz-selection {
  background: #0071f8;
  color: #fff;
}

.section {
  margin-top: 120px;
}

.section-heading {
  margin-bottom: 70px;
}

.section-heading h2 {
  font-size: 40px;
  font-weight: 700;
  text-transform: capitalize;
  margin-top: 20px;
  line-height: 56px;
}

.section-heading h2 em {
  font-style: normal;
  color: #0071f8;
}

.section-heading h6 {
  color: #74b359;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 700;
}

.icon-button a {
  display: inline-block;
  background-color: #1e1e1e;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  height: 50px;
  line-height: 50px;
  padding: 0px 30px 0px 0px;
  border-radius: 25px;
  transition: all 0.3s;
}

.icon-button a i {
  background-color: #f35525;
  height: 50px;
  width: 50px;
  text-align: center;
  border-radius: 50%;
  line-height: 50px;
  display: inline-block;
  margin-right: 15px;
  margin-left: -1px;
}

.icon-button a:hover {
  color: #f35525;
}

.icon-button a:hover i {
  color: #fff;
}

.main-button a {
  display: inline-block;
  background-color: #1e1e1e;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 40px;
  padding: 0px 30px;
  border-radius: 25px;
  transition: all 0.3s;
}

.main-button a:hover {
  background-color: #74b359;
  color: #fff;
}

/*
---------------------------------------------
Properties Style
---------------------------------------------
*/

.properties .item {
  background-color: #fafafa;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
}

.properties .item img {
  border-radius: 10px;
}

.properties .item span.category {
  background-color: #afd1a1;
  font-weight: 500;
  border-radius: 5px;
  font-size: 14px;
  color: #1e1e1e;
  padding: 5px 12px;
  display: inline-block;
  margin-top: 25px;
}

.properties .item h4 {
  font-size: 19px;
  margin: 25px 0px 10px 0px;
}

.properties .item h4 a {
  color: #1e1e1e;
}

.properties .item ul li {
  display: block;
  font-size: 15px;
  color: #4a4a4a;
  /* margin-right: 20px; */
  margin-left: 5px;
  padding-top: 5px;
}

.properties .item ul li span {
  font-weight: 600;
  color: #1e1e1e;
}

.properties .item ul {
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 20px;
  padding-bottom: 20px;
}

.properties .item h6 {
  font-size: 20px;
  color: #6fab55;
  margin-top: 6px;
  display: inline-block;
  float: right;
  margin-top: 30px;
}

.properties .item .main-button {
  text-align: center;
}
</style>
