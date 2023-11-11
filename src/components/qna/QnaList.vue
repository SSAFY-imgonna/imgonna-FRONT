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
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">QnA 목록</h2>
      </div>
      <div class="col-lg-10">
        <div class="row align-self-center mb-2">
          <div class="col-md-2 text-start">
            <button type="button" class="btn btn-outline-primary btn-sm" @click="moveWrite">
              글쓰기
            </button>
          </div>
          <div class="col-md-5 offset-5"></div>
        </div>
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
      <PageNavigation
        :current-page="currentPage"
        :total-page="totalPage"
        @pageChange="onPageChange"
      ></PageNavigation>
    </div>
  </div>
</template>

<style scoped></style>
