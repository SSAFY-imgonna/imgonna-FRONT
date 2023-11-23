<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getDiaryList } from "@/api/diary";

// import VSelect from "@/components/common/VSelect.vue";
import PageNavigation from "@/components/common/PageNavigation.vue";
import DiaryListItem from "./item/DiaryListItem.vue";

const router = useRouter();

const diarys = ref([]);

const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_CARD_LIST_SIZE } = import.meta.env;
const param = ref({
  pgno: currentPage.value,
  spp: VITE_CARD_LIST_SIZE,
  key: "",
  word: "",
});

const contentsList = ref([
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

onMounted(() => {
  DiaryList();
});

const DiaryList = () => {
  // API 호출
  getDiaryList(
    param.value,
    ({ data }) => {
      diarys.value = data.diaryList.filter((diary) => {
        const foundContent = contentsList.value.find(
          (content) => content.value === String(diary.contentTypeId)
        );

        if (foundContent) {
          diary.contentTypeId = foundContent.text;
          return true;
        }

        return false;
      });

      currentPage.value = data.currentPage;
      totalPage.value = data.totalPageCount;
      console.log(diarys.value);
    },
    (error) => {
      console.log(error);
    }
  );
};

const onPageChange = (val) => {
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  param.value.pgno = val;
  DiaryList();
};

const moveWrite = () => {
  router.push({ name: "diary-write" });
};
</script>

<template>
  <div class="properties section">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 offset-lg-4">
          <div class="section-heading text-center">
            <h6>| TRAVEL DIARY</h6>
            <h3>
              여행의 감동을 품에 안고,<br />
              순간의 아름다움을 기록해보세요.
            </h3>
          </div>
        </div>
      </div>

      <ul class="properties-filter">
        <li>
          <a class="is_active" @click="moveWrite">추억 기록하러 가기</a>
        </li>
      </ul>

      <div class="row">
        <DiaryListItem v-for="diary in diarys" :key="diary.diaryNo" :diary="diary"> </DiaryListItem>
      </div>
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
