<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import QnaCommentFormItem from "./item/QnaCommentFormItem.vue";
import QnaCommentListItem from "./item/QnaCommentListItem.vue";
import { getInquiryByInquiryNo, deleteInquiry } from "@/api/qna";

const route = useRoute();
const router = useRouter();

const { qnaNo } = route.params;

const inquiry = ref({});

onMounted(() => {
  getInquiry();
});

const getInquiry = () => {
  console.log(qnaNo + "번글 얻으러 가자!!!");
  // API 호출
  getInquiryByInquiryNo(
    qnaNo,
    ({ data }) => {
      console.log(data);
      inquiry.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

function moveList() {
  router.push({ name: "qna-list" });
}

function moveModify() {
  router.push({ name: "qna-modify", params: { qnaNo } });
}

function onDeleteInquiry() {
  console.log(qnaNo + "번글 삭제하러 가자!!!");
  // API 호출
  deleteInquiry(
    qnaNo,
    ({ data }) => {
      console.log(data);
      alert("글 삭제가 완료되었습니다.");
      router.push({ name: "qna-list" });
    },
    (error) => {
      console.log(error);
    }
  );
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">QnA 글보기</h2>
      </div>
      <div class="col-lg-10 text-start">
        <div class="row my-3">
          <h2 class="text-secondary px-3">{{ inquiry.inquiryNo }}. {{ inquiry.title }}</h2>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="clearfix align-content-center">
              <img
                class="avatar me-2 float-md-start bg-light p-2"
                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
              />
              <p>
                <span class="fw-bold">{{ inquiry.id }}</span> <br />
                <span class="text-secondary fw-light">
                  {{ inquiry.createdTime }}
                </span>
              </p>
            </div>
          </div>
          <div class="col-md-4 align-self-center text-end">댓글 : 17</div>
          <div class="divider mb-3"></div>
          <div class="text-secondary">
            {{ inquiry.content }}
          </div>
          <div class="divider mt-3 mb-3"></div>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-primary mb-3" @click="moveList">
              글목록
            </button>
            <button type="button" class="btn btn-outline-success mb-3 ms-1" @click="moveModify">
              글수정
            </button>
            <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="onDeleteInquiry">
              글삭제
            </button>
          </div>
        </div>
        <QnaCommentFormItem />
        <QnaCommentListItem />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
