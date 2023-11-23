<script setup>
import { ref } from "vue";
import SearchAttractionItem from "../attraction/searchAttractionItem.vue";
import KakaoMapItem from "../plan/KakaoMapItem.vue";
import CourseMapItem from "../course/CourseMapItem.vue";
import PlanItem from "../plan/PlanItem.vue";
import VSelect from "@/components/common/Vselect.vue";
import { createPlan } from "@/api/plan";
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { usePlanStore } from "@/stores/plan";

const selectAttraction = ref({});
const router = useRouter();
const memberStore = useMemberStore();
const planStore = usePlanStore();
const { userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);

const setAttraction = function (attraction) {
  selectAttraction.value = attraction;
};

const { addPlan } = planStore;
const { plans } = storeToRefs(planStore);
const attractions = ref(plans);

const makePlan = function (attraction) {
  console.log("add", attraction);
  addPlan(attraction);
};

const plan = ref({
  name: "",
  id: "",
  startTime: "",
  departureTime: "",
  memo: "",
  themeNo: "",
  attractions: [],
});

const showWarning = (text) => {
  Swal.fire({
    icon: "warning",
    text: text,
  });
};

const themeList = ref([
  {
    text: "테마 선택",
    value: "",
  },
  {
    text: "우정 여행",
    value: "1",
  },
  {
    text: "가족 여행",
    value: "2",
  },
  {
    text: "데이트",
    value: "3",
  },
]);

function registPlan() {
  if (!plan.value.name) {
    showWarning("여행 계획 이름은 필수 입력값입니다!");
  } else if (!plan.value.startTime) {
    showWarning("출발일은 필수 입력값입니다!");
  } else if (!plan.value.departureTime) {
    showWarning("도착일은 필수 입력값입니다!");
  } else if (!plan.value.themeNo) {
    showWarning("여행 테마는 필수 입력값입니다!");
  } else if (attractions.value == null || attractions.value.length == 0) {
    showWarning("여행할 관광지는 0개 이상이어야합니다!");
  } else {
    console.log(member.value.id);
    plan.value.id = member.value.id;
    plan.value.attractions = attractions.value;

    console.log(plan.value);

    createPlan(
      plan.value,
      ({ data }) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "여행계획 등록 완료",
        });
        let planNo = data.planNo;
        router.replace({ name: "plan-view", params: { planNo } });
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "여행계획 등록 실패",
          text: "다시 시도해주세요!",
        });
        console.log(error);
      }
    );
  }
}
const onSelectTheme = (val) => {
  plan.value.themeNo = val;
};
</script>

<template>
  <div class="contact-content">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <form
            id="contact-form"
            method="post"
            enctype="multipart/form-data"
            @submit.prevent="onSubmit"
          >
            <div class="row">
              <div class="col-lg-6">
                <fieldset>
                  <label for="subject">제목</label>
                  <input type="subject" autocomplete="on" v-model="plan.name" />
                </fieldset>
              </div>
              <div class="col-lg-3">
                <fieldset>
                  <label for="name">여행 시작 날짜</label>
                  <input type="date" autocomplete="on" v-model="plan.startTime" />
                </fieldset>
              </div>
              <div class="col-lg-3">
                <fieldset>
                  <label for="name">여행 종료 날짜</label>
                  <input type="date" autocomplete="on" v-model="plan.departureTime" />
                </fieldset>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3">
                <SearchAttractionItem
                  @select-attraction="setAttraction"
                  @add-attraction="makePlan"
                />
              </div>
              <div class="col-lg-6 my-4">
                <KakaoMapItem :attraction="selectAttraction" class="mt-5" />
                <CourseMapItem :attractions="plans" class="mt-4 mb-3" />
              </div>
              <div class="col-lg-3">
                <PlanItem :attractions="attractions" />
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-lg-9">
                <fieldset>
                  <label for="message">메모</label>
                  <textarea pv-model="plan.memo"></textarea>
                </fieldset>
              </div>
              <div class="col-lg-3">
                <fieldset>
                  <label for="message">테마</label>
                  <VSelect :selectOption="themeList" @onKeySelect="onSelectTheme" />
                </fieldset>
                <br /><br /><br />
                <fieldset style="text-align: right">
                  <button @click="registPlan">등록</button>
                </fieldset>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* 관광지 검색 */
.attraction-info {
  cursor: pointer;
  transition: transform 0.5s ease; /* 트랜지션 효과를 추가하여 부드러운 변화를 만듦 */
}
.attraction-info:hover {
  cursor: pointer;
  border: 3px solid #74b359;
  transform: scale(1.05); /* 10% 확대 */
}
.attraction-info div img {
  width: 110px !important;
  height: 110px !important;
}

* */ .contact-content #contact-form .offcanvas-header button {
  background-color: white;
}
.contact-content #contact-form .offcanvas-header button:hover {
  background-color: #74b359;
}

.offcanvas {
  top: 90px;
}

.bi-search {
  margin-right: 10px;
  font-size: 15pt;
}
.search-container {
  display: flex;
  align-items: center;
}

.search-input-container {
  position: relative;
}

.search-input-container input {
  padding-right: 30px; /* 아이콘을 오른쪽에 배치하기 위한 여유 공간 */
}

.search-input-container i {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}
/* Extras */
a:visited {
  color: #888;
}
a {
  color: #999;
  text-decoration: none;
}
p {
  margin-bottom: 0.3em;
}

/*  */
/* @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900"); */

* {
  font-family: "Poppins", sans-serif;
}

i:hover {
  color: #74b359;
  cursor: pointer;
}

i:active {
  /* font-size: 30pt; */
  color: #74b359;
}
/*
---------------------------------------------
Contact Style
---------------------------------------------
*/

.contact {
  background-image: url(../images/contact-bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  padding: 100px 0px 250px 0px;
  position: relative;
}

.contact .section-heading h2 {
  color: #fff;
}

.contact-content {
  margin-top: 100px;
  position: relative;
  z-index: 1;
  height: 50%;
}

.contact-content #map {
  border-radius: 10px;
  margin-bottom: 60px;
}

.contact-content .item {
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  padding: 35px 30px;
  background-color: #fff;
}

.contact-content .phone {
  margin-right: 15px;
}

.contact-content .email {
  margin-left: 15px;
}

.contact-content .item img {
  float: left;
  margin-right: 25px;
  vertical-align: middle;
}

.contact-content .item h6 {
  font-size: 20px;
  font-weight: 600;
  vertical-align: middle;
}

.contact-content .item h6 span {
  font-size: 15px;
  color: #aaaaaa;
  font-weight: 400;
}

.contact-content #contact-form {
  /* margin-left: 30px; */
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);
  padding: 35px 30px;
  background-color: #fff;
}

.contact-content #contact-form label {
  font-size: 15px;
  color: #3a3a3a;
  margin-bottom: 15px;
}

.contact-content #contact-form input[type="text"],
.contact-content #contact-form input[type="date"],
.contact-content #contact-form input[type="subject"] {
  width: 100%;
  height: 44px;
  border-radius: 22px;
  background-color: #f6f6f6;
  border: none;
  margin-bottom: 30px;
  font-size: 14px;
  padding: 0px 15px;
}

.contact-content #contact-form input[type="file"] {
  width: 100%;
  height: 37px;
  margin-bottom: 30px;
  border-radius: 22px;
  background-color: #f6f6f6;
  font-size: 16px;
  border: none;
}
/* .contact-content #contact-form input[type="file"] {
  width: 100%;
  border-radius: 22px;
  background-color: #f6f6f6;
  border: none;
  margin-bottom: 30px;
  font-size: 15px;
  padding: 0px 15px;
} */

.contact-content #contact-form .form-check-input {
  margin-left: 0px;
  margin-right: 5px;
}

.contact-content #contact-form textarea {
  width: 100%;
  height: 150px;
  max-height: 500px;
  min-height: 50px;
  border-radius: 22px;
  background-color: #f6f6f6;
  border: none;
  margin-bottom: 40px;
  font-size: 14px;
  padding: 15px 15px;
}

.contact-content #contact-form button {
  background-color: #1e1e1e;
  height: 44px;
  border-radius: 22px;
  padding: 0px 20px;
  color: #fff;
  border: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.5s;
}

.contact-content #contact-form button:hover {
  background-color: #74b359;
}
</style>
