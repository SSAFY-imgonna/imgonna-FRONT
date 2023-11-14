<script setup>
import { ref, onMounted } from "vue";
import { getAttractionList, getSidoList, getGugunList } from "@/api/attraction";

import VKakaoMap from "@/components/common/VKakaoMap.vue";
import VSelect from "@/components/common/VSelect.vue";

// const serviceKey = import.meta.env.VITE_OPEN_API_SERVICE_KEY;
const { SERVICE_KEY } = import.meta.env;

const sidoList = ref([]);
const gugunList = ref([{ text: "검색할 구군 선택", value: "" }]);
const contentsList = ref([
  {
    text: "검색할 컨텐츠 선택",
    value: "",
  },
  {
    text: "관광지",
    value: "12",
  },
  {
    text: "문화시설",
    value: "14",
  },
  {
    text: "축제공연행사",
    value: "15",
  },
  {
    text: "여행코스",
    value: "25",
  },
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
      options.push({ text: "검색할 시도 선택", value: "" });
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
      options.push({ text: "검색할 구군 선택", value: "" });
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
  <div class="container text-center mt-3">
    <div class="alert alert-primary mt-3 text-center fw-bold" role="alert">전국 관광지 정보</div>
    <div class="row mb-2">
      <div class="col d-flex flex-row-reverse">
        <VSelect :selectOption="sidoList" @onKeySelect="onChangeSido" />
      </div>
      <div class="col d-flex">
        <VSelect :selectOption="gugunList" @onKeySelect="onChangeGugun" />
      </div>
      <div class="col">
        <VSelect :selectOption="contentsList" @onKeySelect="onChangeContents" />
      </div>
    </div>
    <VKakaoMap :attractions="attractions" :select-attraction="selectAttraction" />

    <table class="table table-hover" v-show="attractions.length != 0">
      <thead>
        <tr class="text-center">
          <th scope="col">관광지명</th>
          <th scope="col">위치</th>
          <th scope="col">전화번호</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-center"
          v-for="attraction in attractions"
          :key="attraction.contentId"
          @click="viewAttraction(attraction)"
        >
          <th>{{ attraction.title }}</th>
          <td>{{ attraction.addr1 }}</td>
          <td>{{ attraction.tel }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
mark.purple {
  background: linear-gradient(to top, #c354ff 20%, transparent 30%);
}
</style>
