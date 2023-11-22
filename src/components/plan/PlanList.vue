<script setup>
import { ref, onMounted } from "vue";

import { getPlanList } from "@/api/plan";
import PlanListMapView from "./PlanListMapView.vue";

// import VSelect from "@/components/common/VSelect.vue";
import PageNavigation from "@/components/common/PageNavigation.vue";

const plans = ref([]);

const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_CARD_LIST_SIZE } = import.meta.env;
const param = ref({
  pgno: currentPage.value,
  spp: VITE_CARD_LIST_SIZE,
  key: "",
  word: "",
});

onMounted(() => {
  planList();
});

const planList = () => {
  getPlanList(
    param.value,
    ({ data }) => {
      console.log(data);
      plans.value = data.planList;
      currentPage.value = data.currentPage;
      totalPage.value = data.totalPageCount;
      console.log(plans.value);
    },
    (error) => {
      console.log(error);
    }
  );
};

const onPageChange = (val) => {
  currentPage.value = val;
  param.value.pgno = val;
  planList();
};
</script>

<template>
  <div class="properties section">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 offset-lg-3">
          <div class="section-heading text-center">
            <h6>| TRAVEL PLAN</h6>
            <h3>
              당신의 여행, 당신이 주인공예요!<br />
              새로운 기억을 만들어낼 곳을 계획해보세요.
            </h3>
          </div>
        </div>
      </div>

      <ul class="properties-filter">
        <li>
          <router-link :to="{ name: 'plan-write' }" class="is_active"
            >여행 계획하러 가기</router-link
          >
        </li>
      </ul>

      <section id="chefs" class="chefs">
        <div class="container" data-aos="fade-up">
          <div class="row gy-4">
            <div
              class="col-lg-4 col-md-6 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay="100"
              v-for="plan in plans"
              :key="plan.planNo"
            >
              <router-link :to="{ name: 'plan-view', params: { planNo: plan.planNo } }">
                <div class="chef-member">
                  <div class="member-img">
                    <PlanListMapView :plan="plan" />
                    <!-- <div class="social">
                    <a href=""><i class="bi bi-twitter"></i></a>
                    <a href=""><i class="bi bi-facebook"></i></a>
                    <a href=""><i class="bi bi-instagram"></i></a>
                    <a href=""><i class="bi bi-linkedin"></i></a>
                  </div> -->
                  </div>
                  <div class="member-info">
                    <h4>{{ plan.name }}</h4>
                    <span>{{ plan.startTime }} - {{ plan.departureTime }}</span>
                    <!-- <p>
                    Velit aut quia fugit et et. Dolorum ea voluptate vel tempore tenetur ipsa quae aut.
                    Ipsum exercitationem iure minima enim corporis et voluptate.
                  </p> -->
                  </div>
                </div>
              </router-link>
            </div>
            <!-- End Chefs Member -->
          </div>
        </div>
      </section>
    </div>
    <PageNavigation
      :current-page="currentPage"
      :total-page="totalPage"
      @pageChange="onPageChange"
    ></PageNavigation>
    <!-- <div class="row">
      <div class="col-lg-12">
        <ul class="pagination">
          <li><a href="#">1</a></li>
          <li><a class="is_active" href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">>></a></li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.chefs .chef-member {
  overflow: hidden;
  text-align: center;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 0 30px rgba(55, 55, 63, 0.08);
  transition: 0.3s;
  width: 300px;
}

.chefs .chef-member .member-img {
  position: relative;
  overflow: hidden;
}

.chefs .chef-member .member-img:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-size: contain;
  z-index: 1;
}

.chefs .chef-member .social {
  position: absolute;
  right: -100%;
  top: 30px;
  opacity: 0;
  border-radius: 4px;
  transition: 0.5s;
  background: rgba(255, 255, 255, 0.3);
  z-index: 2;
}

.chefs .chef-member .social a {
  transition: color 0.3s;
  color: rgba(55, 55, 63, 0.4);
  margin: 15px 12px;
  display: block;
  line-height: 0;
  text-align: center;
}

.chefs .chef-member .social a:hover {
  color: rgba(55, 55, 63, 0.9);
}

.chefs .chef-member .social i {
  font-size: 18px;
}

.chefs .chef-member .member-info {
  padding: 10px 15px 20px 15px;
}

.chefs .chef-member .member-info h4 {
  font-weight: 700;
  margin-bottom: 5px;
  font-size: 20px;
  color: var(--color-secondary);
}

.chefs .chef-member .member-info span {
  display: block;
  font-size: 14px;
  font-weight: 400;
  color: rgba(33, 37, 41, 0.4);
}

.chefs .chef-member .member-info p {
  font-style: italic;
  font-size: 14px;
  padding-top: 15px;
  line-height: 26px;
  color: rgba(33, 37, 41, 0.7);
}

.chefs .chef-member:hover {
  transform: scale(1.08);
  box-shadow: 0px 0 30px rgba(55, 55, 63, 0.15);
}

.chefs .chef-member:hover .social {
  right: 8px;
  opacity: 1;
}

.section-heading h3 {
  /* font-size: 30px; */
  font-weight: 700;
  text-transform: capitalize;
  margin-top: 20px;
  line-height: 56px;
}

a {
  text-decoration: none !important;
}
/*
---------------------------------------------
Properties Style
---------------------------------------------
*/
ul {
  padding-left: 0;
}
.properties ul.properties-filter {
  list-style: none;
  text-align: center;
  margin-bottom: 50px;
}

.properties ul.properties-filter li {
  display: inline-block;
  margin: 5px 8px;
}

.properties ul.properties-filter li a {
  display: inline-block;
  text-align: center;
  font-size: 15px;
  text-transform: capitalize;
  font-weight: 500;
  color: #fff;
  background-color: #1e1e1e !important;
  padding: 12px 25px;
  border-radius: 5px;
  transition: all 0.3s;
}

.properties ul.properties-filter li a.is_active {
  background-color: #74b359;
  color: #fff;
}

.properties ul.properties-filter li a.is_active:hover {
  background-color: #74b359 !important;
  color: #fff;
  cursor: pointer;
}

.properties ul.properties-filter li a:hover {
  background-color: #74b359 !important;
  color: #fff;
  cursor: pointer;
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
  margin-top: -10px;
}

.section-heading {
  margin-bottom: 30px;
}

.section-heading h2 {
  font-size: 40px;
  font-weight: 700;
  text-transform: capitalize;
  margin-top: 20px;
  line-height: 56px;
}

.section-heading h3 {
  font-size: 28px;
  font-weight: 700;
  text-transform: capitalize;
  margin-top: 20px;
  line-height: 50px;
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
</style>
