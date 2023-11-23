<script setup>
import { ref, onMounted } from "vue";
import { getAttractionList, getSidoList, getGugunList } from "@/api/attraction";

import VKakaoMap from "@/components/common/VKakaoMap.vue";
import VSelect from "@/components/common/VSelect.vue";

// const serviceKey = import.meta.env.VITE_OPEN_API_SERVICE_KEY;
const { SERVICE_KEY } = import.meta.env;

const sidoList = ref([]);
const gugunList = ref([{ text: "구군 선택", value: "" }]);
const contentsList = ref([
  {
    text: "컨텐츠 선택",
    value: "",
  },
  {
    text: "전체",
    value: "0",
  },
  {
    text: "관광지",
    value: "12",
  },
  {
    text: "문화시설",
    value: "14",
  },
  // {
  //   text: "축제공연행사",
  //   value: "15",
  // },
  // {
  //   text: "여행코스",
  //   value: "25",
  // },
  {
    text: "레포츠",
    value: "28",
  },
  {
    text: "숙박",
    value: "32",
  },
  {
    text: "쇼핑",
    value: "38",
  },
  {
    text: "음식점",
    value: "39",
  },
]);
const attractions = ref([]);
const selectAttraction = ref({});

const attractionParams = ref({
  sidoCode: 0,
  gugunCode: 0,
  contentTypeId: 0,
});

onMounted(() => {
  // getChargingStations();
  loadSidoList();
});

const loadSidoList = () => {
  getSidoList(
    ({ data }) => {
      let options = [];
      options.push({ text: "시도 선택", value: "" });
      data.forEach((sido) => {
        options.push({ text: sido.sidoName, value: sido.sidoCode });
      });
      sidoList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeSido = (val) => {
  attractionParams.value.sidoCode = val;

  getGugunList(
    { sido: val },
    ({ data }) => {
      let options = [];
      options.push({ text: "구군 선택", value: "" });
      data.forEach((gugun) => {
        options.push({ text: gugun.gugunName, value: gugun.gugunCode });
      });
      gugunList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeGugun = (val) => {
  attractionParams.value.gugunCode = val;
};

const onChangeContents = (val) => {
  attractionParams.value.contentTypeId = val;
  console.log(attractionParams.value);
  getAttractionList(
    attractionParams.value,
    ({ data }) => {
      console.log(attractions.value);
      attractions.value = data;
    },
    (err) => {
      console.log(err);
    }
  );
};

const viewAttraction = (attraction) => {
  selectAttraction.value = attraction;
};
</script>

<template>
  <div class="container text-center" style="margin-top: 130px">
    <div class="row">
      <div class="col-lg-5 mx-auto">
        <div class="section-heading text-center">
          <h6>| TRAVEL MAP</h6>
          <h3>지도에서 원하는 장소를 검색해보세요!</h3>
        </div>
      </div>
    </div>
    <div class="row text-center mb-4 d-inline-flex">
      <div class="col-lg-4">
        <VSelect :selectOption="sidoList" @onKeySelect="onChangeSido" />
      </div>
      <div class="col-lg-4">
        <VSelect :selectOption="gugunList" @onKeySelect="onChangeGugun" />
      </div>
      <div class="col-lg-4">
        <VSelect :selectOption="contentsList" @onKeySelect="onChangeContents" />
      </div>
    </div>
    <div class="container mb-4">
      <VKakaoMap :attractions="attractions" :select-attraction="selectAttraction" />
    </div>

    <table class="table table-hover" v-show="attractions.length != 0">
      <thead>
        <tr class="text-center">
          <th scope="col">관광지명</th>
          <th scope="col">사진</th>
          <th scope="col">위치</th>
          <th scope="col">전화번호</th>
        </tr>
      </thead>
      <tbody v-show="attractions.length != 0">
        <tr
          class="text-center"
          v-for="attraction in attractions"
          :key="attraction.contentId"
          @click="viewAttraction(attraction)"
        >
          <th>{{ attraction.title }}</th>
          <td>
            <img v-if="attraction.firstImage" :src="attraction.firstImage" alt="" width="200" />
            <img v-else src="/no_image.png" alt="" width="50" />
          </td>
          <td>{{ attraction.addr1 }}</td>
          <td>{{ attraction.tel }}</td>
        </tr>
      </tbody>
      <tbody v-show="attractions.length == 0">
        <tr class="text-center">
          <td colspan="4">내용이 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
/* .col-lg-4 {
  padding: 0 20px;
} */
mark.purple {
  background: linear-gradient(to top, #c354ff 20%, transparent 30%);
}
* {
  font-family: "Nanum Gothic", sans-serif !important;
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
