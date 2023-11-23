<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getInquiryList } from "@/api/qna";

// import VSelect from "@/components/common/VSelect.vue";
import PageNavigation from "@/components/common/PageNavigation.vue";
import QnaListItem from "@/components/qna/item/QnaListItem.vue";

const router = useRouter();

const inquiries = ref([]);
const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;
const param = ref({
  pgno: currentPage.value,
  spp: VITE_ARTICLE_LIST_SIZE,
  key: "",
  word: "",
});

onMounted(() => {
  InquiryList();
});

const InquiryList = () => {
  console.log("서버에서 글목록 얻어오자!!!", param.value);
  // API 호출
  getInquiryList(
    param.value,
    ({ data }) => {
      console.log(data);
      inquiries.value = data.inquiryList;
      currentPage.value = data.currentPage;
      totalPage.value = data.totalPageCount;
      console.log(inquiries.value);
    },
    (error) => {
      console.log(error);
    }
  );
};
``;
const onPageChange = (val) => {
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  param.value.pgno = val;
  InquiryList();
};

const moveWrite = () => {
  router.push({ name: "qna-write" });
};
</script>

<template>
  <div class="properties section">
    <div class="container">
      <div class="row">
        <div class="col-lg- mx-auto">
          <div class="section-heading text-center">
            <h6>| Q&A</h6>
            <h3>
              여행자간 상호 질의 및 응답할 수 있는 공개 Q&A 게시판입니다.<br />
              자유롭게 의견을 나눠보세요!
            </h3>
          </div>
        </div>
      </div>
    </div>

    <ul class="properties-filter">
      <li>
        <a class="is_active" @click="moveWrite">질문하러 가기</a>
      </li>
    </ul>

    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="row align-self-center mb-2">
          <table class="table table-hover">
            <thead>
              <tr class="text-center">
                <th scope="col">글번호</th>
                <th scope="col">제목</th>
                <th scope="col">작성자</th>
                <th scope="col">작성일</th>
              </tr>
            </thead>
            <tbody>
              <QnaListItem
                v-for="inquiry in inquiries"
                :key="inquiry.inquryNo"
                :inquiry="inquiry"
              ></QnaListItem>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <PageNavigation
      :current-page="currentPage"
      :total-page="totalPage"
      @pageChange="onPageChange"
    ></PageNavigation>
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
