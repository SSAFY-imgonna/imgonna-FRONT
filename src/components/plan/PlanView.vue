<script setup>
import { ref, onMounted } from "vue";
import { getPlanByPlanNo, deletePlanByPlanNo } from "@/api/plan";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

import TimelineItem from "@/components/plan/item/TimelineItem.vue";
import PlanMapView from "./PlanMapView.vue";

const route = useRoute();
const router = useRouter();

const plan = ref({});
const themeList = ["", "우정 여행", "가족 여행", "데이트"];
const { planNo } = route.params;
const mapName = ref("");
const themeName = ref("");

onMounted(() => {
  getPlanByPlanNo(
    planNo,
    ({ data }) => {
      mapName.value = "planDetails" + data.planNo;
      themeName.value = themeList[data.themeNo];
      plan.value = data;
      console.log(plan.value.courses);
    },
    (error) => {
      console.log(error);
    }
  );
});

const deletePlan = () => {
  deletePlanByPlanNo(
    planNo,
    ({ data }) => {
      Swal.fire({
        scrollbarPadding: false,
        // optional
        heightAuto: false,
        icon: "success",
        text: "삭제 완료되었습니다.",
      });

      router.replace({ name: "plan-list" });
    },
    (error) => {
      console.log(error);
    }
  );
};

function moveList() {
  router.push({ name: "plan-list" });
}
</script>

<template>
  <div class="contact section">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 offset-lg-4">
          <div class="section-heading text-center">
            <h6>| TRAVEL PLAN</h6>
            <h2>{{ plan.name }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="contact-content">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div id="map">
            <!-- 여기에 지도 넣으면 됨 -->
            <PlanMapView :plan="plan" />
          </div>
        </div>
        <div class="col-lg-6">
          <form id="contact-form" action="" method="post">
            <div class="row">
              <div class="col-lg-6">
                <fieldset>
                  <label for="id">등록자</label>
                  <input type="name" name="id" id="id" v-model="plan.id" disabled />
                </fieldset>
              </div>
              <div class="col-lg-6">
                <fieldset>
                  <label for="time">테마</label>
                  <input type="name" name="time" id="time" :value="themeName" disabled />
                </fieldset>
              </div>
              <div class="col-lg-6">
                <fieldset>
                  <label for="departure">출발일</label>
                  <input
                    type="text"
                    name="departure"
                    id="departure"
                    v-model="plan.startTime"
                    disabled
                  />
                </fieldset>
              </div>
              <div class="col-lg-6">
                <fieldset>
                  <label for="arrive">도착일</label>
                  <input
                    type="text"
                    name="arrive"
                    id="arrive"
                    v-model="plan.departureTime"
                    disabled
                  />
                </fieldset>
              </div>
              <div class="col-lg-12">
                <fieldset v-if="plan.memo">
                  <label for="memo">계획 상세</label>
                  <textarea name="memo" id="memo" v-model="plan.memo" disabled></textarea>
                </fieldset>
              </div>
              <div class="col-lg-12 button-list">
                <fieldset>
                  <button type="submit" id="form-list" @click="moveList" class="btn">목록</button>
                  <button type="submit" id="form-delete" class="orange-button" @click="deletePlan">
                    삭제
                  </button>
                </fieldset>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- 여기서부터 타임라인 -->
  <TimelineItem
    :courses="plan.courses"
    :startTime="plan.startTime"
    :departureTime="plan.departureTime"
  ></TimelineItem>
</template>

<style scoped>
.button-list {
  text-align: center;
}
button[type="submit"] {
  margin: 0 15px;
  padding: 0 30px !important;
}
/*
---------------------------------------------
Contact Style
---------------------------------------------
*/

.contact {
  /* background-color: fafafa; */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  padding: 100px 0px 250px 0px;
  position: relative;
}

.contact .section-heading h2 {
  color: #1e1e1e;
}

.contact-content {
  margin-top: -180px;
  position: relative;
  z-index: 1;
}

.contact-content #map {
  border-radius: 10px;
  margin-bottom: 60px;
  margin-right: 15px;
  margin-left: 15px;
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
  margin-left: 15px;
  margin-right: 15px;
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

.contact-content #contact-form input {
  width: 100%;
  height: 44px;
  border-radius: 22px;
  background-color: #f6f6f6;
  border: none;
  margin-bottom: 30px;
  font-size: 14px;
  padding: 0px 15px;
}

.contact-content #contact-form textarea {
  width: 100%;
  height: 150px;
  max-height: 180px;
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

/*
---------------------------------------------
font & reset css
---------------------------------------------
*/
/* @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900"); */
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
  margin-top: 60px;
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
  background-color: #74b359;
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
  color: #74b359;
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
</style>
