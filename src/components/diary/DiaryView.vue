<script setup>
const imageUrl = new URL("@/assets/img/springboot/upload/", import.meta.url).href;

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { getDiaryByDiaryNo, deleteDiary } from "@/api/diary";

const route = useRoute();
const router = useRouter();

const { diaryNo } = route.params;

const diary = ref({});

onMounted(() => {
  getDiary();
});

const getDiary = () => {
  console.log(diaryNo + "번글 얻으러 가자!!!");
  // API 호출
  getDiaryByDiaryNo(
    diaryNo,
    ({ data }) => {
      console.log(data);
      diary.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

function moveList() {
  router.push({ name: "diary-list" });
}

function moveModify() {
  router.push({ name: "diary-modify", params: { diaryNo } });
}

function onDeleteDiary() {
  console.log(diaryNo + "번글 삭제하러 가자!!!");
  // API 호출
  deleteDiary(
    diaryNo,
    ({ data }) => {
      console.log(data);
      alert("글 삭제가 완료되었습니다.");
      router.push({ name: "diary-list" });
    },
    (error) => {
      console.log(error);
    }
  );
}
</script>

<template>
  <div class="section best-deal">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 offset-lg-4">
          <div class="text-center">
            <h4>| TRAVEL DIARY</h4>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="main-content">
            <span class="category">EnjoyTrip</span>
          </div>
          <div class="section-heading">
            <h2>{{ diary.title }}</h2>
            <div class="col-md-8">
              <div class="clearfix align-content-center">
                <img
                  class="avatar me-2 float-md-start bg-light p-2"
                  src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
                />
                <p>
                  <span class="fw-bold">{{ diary.id }}</span
                  ><br />
                  <span class="text-secondary fw-light"> {{ diary.createdTime }} </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="tabs-content">
            <div class="row">
              <div class="tab-content" id="myTabContent">
                <div class="row">
                  <div class="col-lg-3">
                    <div class="info-table">
                      <ul>
                        <li>여행일 : {{ diary.travelTime }} <span> 위치</span></li>
                      </ul>
                      위도 : {{ diary.latitude }}<br />
                      위도 : {{ diary.longitude }}<br />
                      여기에 이제 카카오 지도 들어옴<br />
                      여기에 이제 카카오 지도 들어옴<br />
                      여기에 이제 카카오 지도 들어옴<br />
                      여기에 이제 카카오 지도 들어옴<br />
                      여기에 이제 카카오 지도 들어옴<br />
                      여기에 이제 카카오 지도 들어옴<br />
                      여기에 이제 카카오 지도 들어옴<br />
                      <!-- <li>Floor number <span>3</span></li>
                        <li>Number of rooms <span>8</span></li>
                        <li>Parking Available <span>Yes</span></li>
                        <li>Payment Process <span>Bank</span></li> -->
                    </div>
                  </div>
                  <div class="col-lg-6" v-if="diary.fileInfos && diary.fileInfos.length > 0">
                    <img
                      class="photo"
                      :src="`${imageUrl}/${diary.fileInfos[0].saveFolder}/${diary.fileInfos[0].saveFile}`"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-8">
                <div class="main-content-section">
                  {{ diary.content }}
                </div>
              </div>
              <!--  -->
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  id="btn-list"
                  class="btn btn-outline-primary mb-3"
                  @click="moveList"
                >
                  글목록
                </button>
                <!-- 글 작성자 일때 -->

                <button
                  type="button"
                  id="btn-mv-modify"
                  class="btn btn-outline-success mb-3 ms-1"
                  @click="moveModify"
                >
                  글수정
                </button>
                <button
                  type="button"
                  id="btn-delete"
                  class="btn btn-outline-danger mb-3 ms-1"
                  @click="onDeleteDiary"
                >
                  글삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-content-section {
  margin-top: 40px;
}
.section {
  margin-top: -90px !important;
}
.section-heading {
  margin-bottom: 40px !important;
}
p {
  font-size: 14px;
  line-height: 28px;
  color: #4a4a4a;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #1e1e1e;
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: 700;
}

ol,
ul {
  padding-left: 0;
}

img.photo {
  width: 100%;
  overflow: hidden;
}

.section-heading h6 {
  color: #74b359;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 700;
}

.text-center h4 {
  color: #74b359;
  text-transform: uppercase;
  font-weight: 700;
}

.section-heading h2 {
  font-size: 40px;
  font-weight: 700;
  text-transform: capitalize;
  margin-top: 20px;
  line-height: 56px;
  margin-bottom: 30px;
}

/* 
---------------------------------------------
Best Deal Style
--------------------------------------------- 
*/

.best-deal {
  background-color: #fafafa;
  padding: 100px 0px;
}

.best-deal .tab-content img {
  padding: 0px 45px;
}

.best-deal .tabs-content .nav-link {
  font-size: 16px;
  font-weight: 500;
  background-color: #1e1e1e !important;
  border-radius: 5px;
  height: 50px;
  line-height: 50px;
  display: inline-block;
  padding: 0px 25px;
  color: #fff;
}

.best-deal .tabs-content .nav-tabs .nav-link.active {
  background-color: #f35525 !important;
  color: #fff;
}

.best-deal .tabs-content ul.nav-tabs {
  border-bottom: none !important;
  margin-bottom: 80px;
  align-items: end;
  justify-content: end;
  margin-top: -130px;
}

.best-deal .tabs-content ul.nav-tabs li {
  padding-right: 0px;
  border-right: none;
  margin-left: 20px;
}

.best-deal .info-table {
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  padding: 35px 30px;
}

.best-deal .info-table ul li {
  display: block;
  margin-bottom: 24px !important;
  padding-bottom: 24px !important;
  border-bottom: 1px solid #eee !important;
  text-align: left;
  font-size: 15px;
  color: #aaa;
  font-weight: 400;
}

.best-deal .info-table ul li:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.best-deal .info-table ul li span {
  font-size: 20px;
  color: #1e1e1e;
  font-weight: 700;
  float: right;
  display: inline-block;
}

.best-deal .tabs-content {
  padding: 0px;
  background-color: transparent;
}

.best-deal .tabs-content h4 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 30px;
}

.best-deal .icon-button {
  margin-top: 30px;
}

/* 
---------------------------------------------
Responsive Style
--------------------------------------------- 
*/

body {
  overflow-x: hidden;
}

@media (max-width: 767px) {
  .header-area .main-nav .logo h1 {
    line-height: 80px !important;
  }
  .best-deal .tabs-content .nav-link {
    font-size: 14px;
    padding: 0px 15px;
    height: 44px;
    line-height: 44px;
  }
  .best-deal .tabs-content ul.nav-tabs li {
    margin: 0px 5px;
  }
  .properties ul.properties-filter li a {
    font-size: 14px;
    padding: 10px 15px;
  }
  .properties ul.properties-filter li {
    margin: 5px;
  }
  .header-area .main-nav .nav li:last-child {
    display: none;
  }
}

@media (max-width: 992px) {
  .sub-header {
    display: none;
  }
  .header-area .main-nav .logo h1 {
    line-height: 100px;
  }
  .background-header .main-nav .logo h1 {
    line-height: 80px;
  }
  .header-area .main-nav .nav li a {
    padding-left: 3px;
    padding-right: 3px;
  }
  .header-area .main-nav .nav li:last-child a {
    padding-right: 15px;
  }
  .main-banner .item h2 {
    width: 100%;
  }
  .featured .section-heading {
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 100px;
  }
  .featured .accordion {
    margin-left: 0px;
    margin-right: 0px;
  }
  .featured .info-table {
    margin-top: 45px;
  }
  .fun-facts .counter {
    margin-bottom: 45px;
  }
  .best-deal .section-heading {
    text-align: center;
  }
  .best-deal .tabs-content ul.nav-tabs {
    margin-top: 0px;
    justify-content: center;
  }
  .best-deal .info-table {
    margin-bottom: 45px;
  }
  .best-deal .tab-content img {
    padding: 0px;
  }
  .best-deal .tabs-content h4 {
    margin-top: 45px;
  }
  .properties .item h6 {
    text-align: center;
    margin-bottom: 15px;
  }
  .properties .item .main-button {
    text-align: center;
  }
  .properties .item ul li {
    margin-right: 10px;
    font-size: 13px;
  }
  .contact-content .phone {
    margin-right: 0px;
    margin-bottom: 20px;
  }
  .contact-content .email {
    margin-left: 0px;
    margin-bottom: 45px;
  }
  .contact-content #contact-form {
    margin-left: 0px;
  }
  .single-property .info-table {
    margin-left: 0px;
    margin-top: 45px;
  }
  .contact-page .section-heading {
    margin-right: 0px !important;
  }
  .contact-page #contact-form {
    margin-left: 0px;
    margin-top: 60px;
  }
  .best-deal .info-table ul li span {
    float: right !important;
    width: auto !important;
  }
}

@media (max-width: 1200px) {
  .best-deal .info-table ul li span {
    float: none;
    width: 100%;
  }
  .contact-page .section-heading {
    margin-right: 100px;
  }
}

/* 
---------------------------------------------
Single Page Style
--------------------------------------------- 
*/

.single-property .main-image img {
  float: none;
}

.main-content h4 {
  font-size: 25px;
  margin-top: 25px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #eee;
}

.main-content h3 {
  margin-top: 25px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #eee;
}

span.category {
  background-color: #74b359;
  font-weight: 600;
  border-radius: 5px;
  font-size: 14px;
  color: #eee;
  padding: 5px 12px;
  display: inline-block;
  margin-top: 40px;
}

.single-property .accordion {
  margin-top: 60px;
  margin-left: 0px;
  margin-right: 0px;
  --bs-accordion-border-radius: 10px;
  --bs-accordion-inner-border-radius: 10px;
  --bs-accordion-bg: #fafafa;
  --bs-accordion-border-color: none;
  border: none !important;
}

.single-property .accordion-header {
  border-bottom: 1px solid #eaeaea;
}

.single-property .accordion-button {
  box-shadow: none;
  font-size: 17px;
  font-weight: 500;
  color: #1e1e1e;
}

.single-property .accordion-button:not(.collapsed) {
  color: #f35525;
  background-color: #fafafa;
  outline: none;
}

.single-property .accordion-button::after {
  display: none;
}

.single-property #headingThree {
  border-bottom: none;
}

.single-property .accordion-item:last-of-type .accordion-collapse {
  border-top: 1px solid #eaeaea;
}

.single-property .info-table {
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  padding: 35px 30px;
  margin-left: 60px;
}

.single-property .info-table ul li {
  display: block;
  margin-bottom: 35px;
  padding-bottom: 35px;
  border-bottom: 1px solid #eee;
}

.single-property .info-table ul li:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.single-property .info-table ul li img {
  float: left;
  margin-right: 25px;
}

.single-property .info-table ul li h4 {
  font-size: 22px;
  font-weight: 600;
}

.single-property .info-table ul li h4 span {
  font-size: 15px;
  color: #aaa;
  font-weight: 400;
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

/* .section-heading h2 {
  font-size: 40px;
  font-weight: 700;
  text-transform: capitalize;
  margin-top: 20px;
  line-height: 56px;
} */

/* .section-heading h2 {
  margin-top: 25px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #eee;
} */
.section-heading {
  margin-top: 25px;
  margin-bottom: 40px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}

.section-heading h2 em {
  font-style: normal;
  color: #0071f8;
}

.section-heading h6 {
  color: #74b359;
  font-size: 15px;
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
  background-color: #f35525;
  color: #fff;
}
</style>
