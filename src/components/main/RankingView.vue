<script setup>
import { ref, onMounted } from "vue";
import { getRankList } from "@/api/diary";
import { getAccompanyRankList } from "@/api/accompany";
import RankMapView from "./RankMapView.vue";
import router from "../../router";

const rankList = ref();
const accompanyList = ref();

onMounted(() => {
  getRankList(
    null,
    ({ data }) => {
      console.log(data);
      rankList.value = data;
    },
    (err) => {
      console.log(err);
    }
  );
  getAccompanyRankList(
    null,
    ({ data }) => {
      console.log(data);
      accompanyList.value = data.accompanyList;
    },
    (err) => {
      console.log(err);
    }
  );
});
</script>

<template>
  <section id="chefs" class="chefs">
    <div class="container" data-aos="fade-up">
      <div class="row justify-content-center">
        <div class="col-8 px-5">
          <div class="festival-text text-center">
            <h3 class="sixth">
              발자취 랭킹
              <!-- <img src="/icon/festival_icon.png" width="40" /> -->
            </h3>
          </div>
          <div class="row gy-4">
            <div
              class="col-lg-4 col-md-6 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay="100"
              v-for="(rank, index) in rankList"
            >
              <div class="chef-member">
                <div class="member-img">
                  <RankMapView :attractions="rank.attractions" :map-name="`mapName${index}`" />
                  <!-- <img src="assets/img/chefs/chefs-1.jpg" class="img-fluid" alt="" /> -->
                  <div class="social">
                    <a href=""><i class="bi bi-twitter"></i></a>
                    <a href=""><i class="bi bi-facebook"></i></a>
                    <a href=""><i class="bi bi-instagram"></i></a>
                    <a href=""><i class="bi bi-linkedin"></i></a>
                  </div>
                </div>
                <div class="member-info">
                  <h4>{{ rank.member.nickname }}님</h4>
                  <span>총 방문지 수: {{ rank.attractions.length }}</span>
                  <!-- <p>
                Velit aut quia fugit et et. Dolorum ea voluptate vel tempore tenetur ipsa quae aut.
                Ipsum exercitationem iure minima enim corporis et voluptate.
              </p> -->
                </div>
              </div>
            </div>
            <!-- End Chefs Member -->
          </div>
        </div>
        <div class="col-3">
          <div class="festival-text text-center">
            <h3 class="sixth mb-4">
              인기 동행
              <!-- <img src="/icon/festival_icon.png" width="40" /> -->
            </h3>
            <template v-for="(accompany, idx) in accompanyList">
              <div class="customoverlay mb-2">
                <router-link
                  :to="{ name: 'accompany-view', params: { accompanyNo: accompany.accompanyNo } }"
                >
                  <p class="title" style="font-size: 18px">
                    {{ idx + 1 }}&nbsp{{ accompany.title }}
                  </p>
                </router-link>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Chefs Section -->
</template>

<style scoped>
.customoverlay {
  /* position: relative; */
  border-radius: 6px;
  border: 1px solid #a19e9e;
  border-bottom: 2px solid #ddd;
  float: left;
  width: 100%;
}
.customoverlay:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.customoverlay a {
  display: block;
  text-decoration: none;
  color: #000;
  text-align: left;
  border-radius: 6px;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
}
.customoverlay .title {
  text-align: left;
  background: #fff;
  padding: 10px 10px;
  font-size: 18px;
  font-weight: bold;
}

section {
  overflow: hidden;
  padding: 0px 0;
}
.festival-text {
  margin-bottom: 3%;
}

.festival-text .sixth {
  position: relative;
  font-weight: 800;
  font-family: "Noto Sans KR", sans-serif;
}

.sixth:before,
.sixth:after {
  content: "[";
  display: inline-block;
  position: relative;
  top: 1px;
  height: 100%;
  font-size: 1.25em;
  color: #74b359;

  transition: all 0.5s ease;
}

.sixth:after {
  content: "]";
}

.sixth:hover:before {
  transform: translateX(-5px);
}

.sixth:hover:after {
  transform: translateX(5px);
}
/*--------------------------------------------------------------
# Chefs Section
--------------------------------------------------------------*/
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
</style>
