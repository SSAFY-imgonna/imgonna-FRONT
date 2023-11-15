<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAccompanyList } from "@/api/accompany";

// import VSelect from "@/components/common/VSelect.vue";
import PageNavigation from "@/components/common/PageNavigation.vue";
import AccompanyListItem from "@/components/accompany/item/AccompanyListItem.vue";

const router = useRouter();

const accompanys = ref([]);

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
  AccompanyList();
});

const AccompanyList = () => {
  console.log("서버에서 글목록 얻어오자!!!", param.value);
  // API 호출
  getAccompanyList(
    param.value,
    ({ data }) => {
      console.log(data);
      accompanys.value = data;
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
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  param.value.pgno = val;
  InquiryList();
};

const moveWrite = () => {
  router.push({ name: "accompany-write" });
};
</script>

<template>
  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">동행 구하기</h1>
        <p class="lead text-body-secondary">
          당신의 여정을 함께할 동행을 찾고 계시나요?<br />
          외로운 여행을 더 즐겁고 안전하게 만들어 드립니다.<br />
          다양한 취향과 관심을 공유할 친구를 찾고 싶다면 지금 구해보세요!<br />
          새로운 경험과 추억을 만들기 위해 우리와 함께 나아갑시다.<br />
        </p>
        <p class="lead">#동행구하기 #새로운친구 #여행파트너</p>
        <!-- 로그인 하지 않은 회원일 때 처리 -->
        <p>
          <button type="button" class="btn btn-primary my-2" @click="moveWrite">
            동행 모집글 작성
          </button>
        </p>
      </div>
    </div>
  </section>

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

  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <!-- 제목 길어질 경우 truncate 처리 -->
      <AccompanyListItem
        v-for="accompany in accompanys"
        :key="accompany.accompanyNo"
        :accompany="accompany"
      ></AccompanyListItem>
    </div>
  </div>
</template>

<style scoped></style>
