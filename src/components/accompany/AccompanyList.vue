<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { getAccompanyList } from "@/api/accompany";

// import VSelect from "@/components/common/VSelect.vue";
import PageNavigation from "@/components/common/PageNavigation.vue";
import AccompanyListItem from "@/components/accompany/item/AccompanyListItem.vue";

const router = useRouter();

const accompanys = ref([]);

const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_CARD_LIST_SIZE } = import.meta.env;

const param = ref({
  pgno: currentPage.value,
  spp: VITE_CARD_LIST_SIZE,
  key: "",
  word: "",
  cat: "전체",
});

onMounted(() => {
  AccompanyList();
});

watch(
  () => param.value.cat,
  (value) => {
    AccompanyList();
  }
);

const AccompanyList = () => {
  // API 호출
  getAccompanyList(
    param.value,
    ({ data }) => {
      console.log(data);
      accompanys.value = data.accompanyList;
      currentPage.value = data.currentPage;
      totalPage.value = data.totalPageCount;
      console.log(accompanys.value);
    },
    (error) => {
      console.log(error);
    }
  );
};

const onPageChange = (val) => {
  currentPage.value = val;
  param.value.pgno = val;
  AccompanyList();
};

const moveWrite = () => {
  router.push({ name: "accompany-write" });
};
</script>

<template>
  <div class="properties section">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div class="section-heading text-center">
            <h6>| FINDING A FRIEND</h6>
            <h3>
              당신의 여정을 함께할 동행을 찾고 계시나요?<br />
              외로운 여행을 더 즐겁고 안전하게 만들어 드립니다.<br />
              다양한 취향과 관심을 공유할 친구를 찾고 싶다면 지금 구해보세요!<br />
            </h3>
            <p class="lead">#동행구하기 #새로운친구 #여행파트너</p>
          </div>
        </div>
      </div>

      <ul class="properties-filter">
        <li>
          <a class="is_active" @click="moveWrite">동행자 구하러 가기</a>
        </li>
      </ul>

      <div class="row">
        <div class="col-lg-3 btn-group" role="group" aria-label="Basic radio toggle button group">
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio1"
            autocomplete="off"
            value="전체"
            v-model="param.cat"
          />
          <label class="btn btn-outline-dark" for="btnradio1">전체</label>

          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio2"
            autocomplete="off"
            value="모집중"
            v-model="param.cat"
          />
          <label class="btn btn-outline-dark" for="btnradio2">모집중</label>

          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio3"
            autocomplete="off"
            value="모집임박"
            v-model="param.cat"
          />
          <label class="btn btn-outline-dark" for="btnradio3">모집임박</label>
        </div>
      </div>

      <div class="row">
        <!-- 제목 길어질 경우 truncate 처리 -->
        <AccompanyListItem
          v-for="accompany in accompanys"
          :key="accompany.accompanyNo"
          :accompany="accompany"
        ></AccompanyListItem>
      </div>
    </div>

    <!-- <div class="album py-5 bg-body-tertiary mx-auto">
  	<div class="container mb-4 col-6">
      <form class="d-flex" method="GET" id="form-search" action="${root}/accompany/search">
        	<input type="hidden" name="action" value="searchList">
          <select id="keyfield1" class="form-select form-select-sm w-50"
          aria-label="검색조건" name="keyfield">
          <c:if test="${empty keyfield1 || (not empty keyfield1 && keyfield1 == 'condition')}">
            	<option value="condition" selected>정렬조건</option>
            	<option value="hit">조회수</option>
            	<option value="regDate">작성일순</option>
            </c:if>
            <c:if test="${not empty keyfield1 && keyfield1 == 'hit'}">
              <option value="condition">정렬조건</option>
            	<option value="hit" selected>조회수</option>
            	<option value="regDate">작성일순</option>
            </c:if>
            <c:if test="${not empty keyfield1 && keyfield1 == 'regDate'}">
              <option value="condition">정렬조건</option>
            	<option value="hit">조회수</option>
            	<option value="regDate" selected>작성일순</option>
            </c:if>
          </select>
          <select id="keyfield2" class="form-select form-select-sm w-50"
          aria-label="검색조건" name="keyfield">
          <option value="condition" selected>검색조건</option>
            <option value="title">제목</option>
            <option value="titleContent">제목+내용</option>
          </select>          
          <div class="input-group input-group-sm">
            <input type="text" class="form-control" name="keyword" placeholder="검색어..." />
            <button class="btn btn-dark" type="button" id="search-btn">검색</button>
          </div>
        </form>
      </div> -->

    <PageNavigation
      :current-page="currentPage"
      :total-page="totalPage"
      @pageChange="onPageChange"
    ></PageNavigation>
  </div>
</template>

<style scoped>
@import "@/assets/css/accompany.css";
</style>
