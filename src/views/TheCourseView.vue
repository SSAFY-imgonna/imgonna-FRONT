<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { getAttractionList, getSidoList, getGugunList } from "@/api/attraction";
import { getCourseList } from "@/api/attraction";

// const serviceKey = import.meta.env.VITE_OPEN_API_SERVICE_KEY;
const { VITE_OPEN_API_SERVICE_KEY } = import.meta.env;

const sidoList = ref([]);
const gugunList = ref([]);
const contentsList = ref([
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
  contentTypeId: 25,
});

onMounted(() => {
  getCourses();
  loadSidoList();
});

const loadSidoList = () => {
  getSidoList(
    ({ data }) => {
      let options = [];
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

const params = ref({
  ServiceKey: VITE_OPEN_API_SERVICE_KEY,
  numOfRows: 12,
  pageNo: 1,
  MobileOS: "ETC",
  MobileApp: "AppTest",
  listYN: "Y",
  arrange: "A",
  contentTypeId: 25,
  areaCode: "",
  sigunguCode: "",
  cat1: "C01",
  cat2: "",
  cat3: "",
  _type: "json",
});

const courseList = ref([]);

onMounted(() => {
  getCourses();
});

const getCourses = () => {
  getCourseList(
    params.value,
    ({ data }) => {
      console.log(data);
      // console.log(getCourseList.);
    },
    (error) => {
      console.log(error);
      courseList.value = error.data.response.body.items.item;
      // let items = error.data.response.body.items.item;
      // for (var i = 0; i < items.length; i += 3) {
      //   let arr = [];
      //   arr.push(items[i]);
      //   arr.push(items[i + 1]);
      //   arr.push(items[i + 2]);
      //   arr.push(items[i + 3]);
      //   courseList.value.push(arr);
      // }
      console.log(courseList.value);
    }
  );
};

const viewAttraction = (attraction) => {
  selectAttraction.value = attraction;
};
</script>

<template>
  <!-- ======= Breadcrumbs ======= -->
  <section id="breadcrumbs" class="breadcrumbs">
    <div class="breadcrumb-hero">
      <div class="container">
        <div class="breadcrumb-hero" style="padding-bottom: 0px">
          <h2>여행 코스 살펴보기</h2>
          <p>여행 코스를 살펴보세요!</p>
        </div>
      </div>
    </div>

    <section id="portfolio" class="list" style="background: #94c045">
      <div class="row">
        <div class="col-lg-12 d-flex justify-content-center" data-aos="fade-up">
          <ul id="portfolio-flters">
            <!-- <li data-filter="*" class="filter-active">All</li> -->
            <li
              v-for="sido in sidoList"
              data-filter=".filter-app"
              @click="onChangeSido(sido.value)"
            >
              {{ sido.text }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </section>
  <!-- End Breadcrumbs -->

  <section id="portfolio" class="portfolio">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 d-flex justify-content-center" data-aos="fade-up">
          <ul id="portfolio-flters">
            <!-- <li data-filter="*" class="filter-active">All</li> -->
            <li
              v-for="gugun in gugunList"
              data-filter=".filter-app"
              @click="onChangeGugun(gugun.value)"
            >
              {{ gugun.text }}
            </li>
            <!-- <li
              v-for="content in contentsList"
              data-filter=".filter-app"
              @click="onChangeContents(content.value)"
            >
              #{{ content.text }}
            </li> -->
          </ul>
        </div>
      </div>
    </div>
  </section>

  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr class="text-center">
          <th scope="col">관광지명</th>
          <th scope="col">사진</th>
          <th scope="col">위치</th>
          <th scope="col">전화번호</th>
        </tr>
      </thead>
      <tbody v-show="attractions.length != 0">
        <tr class="text-center" v-for="attraction in attractions" :key="attraction.contentId">
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

  <div class="container text-center mt-3">
    <!-- <div class="alert alert-primary mt-3 text-center fw-bold" role="alert">전국 관광지 정보</div>
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
    </table> -->
  </div>
</template>

<style>
@import "../components/css/indexstyles.css";
section {
  padding: 20px;
}
.list #portfolio-flters li {
  cursor: pointer;
  display: inline-block;
  padding: 8px 15px 10px 15px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  color: #444444;
  transition: all 0.3s ease-in-out;
  border-radius: 3px;
}

.list #portfolio-flters li:hover,
.list #portfolio-flters li.filter-active {
  color: #444444;
  background: #fff;
}

mark.purple {
  background: linear-gradient(to top, #c354ff 20%, transparent 30%);
}
</style>
