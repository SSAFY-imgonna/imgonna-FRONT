<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import QnaCommentFormItem from "./item/QnaCommentFormItem.vue";
import QnaCommentListItem from "./item/QnaCommentListItem.vue";
import { getInquiryByInquiryNo, deleteInquiry } from "@/api/qna";
import { getCommentListByInquiryNo, deleteComment } from "@/api/qnaComment";
import Swal from "sweetalert2";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);

const route = useRoute();
const router = useRouter();

const inquiryNo = ref(0);

const inquiry = ref({});
const commentList = ref({});

const memberInfo = ref({
  id: null,
  writerId: "",
});

onMounted(() => {
  if (member.value != null) {
    memberInfo.value.id = member.value.id;
  }
  inquiryNo.value = route.params.qnaNo;
  getInquiry();
  getComments();
});

watch(
  () => route.params,
  (value) => {
    inquiryNo.value = route.params.inquiryNo;
    console.log("감시", inquiryNo.value);
    getInquiry();
    getComments();
  }
);

const getInquiry = () => {
  console.log(inquiryNo.value + "번글 얻으러 가자!!!");
  // API 호출
  getInquiryByInquiryNo(
    inquiryNo.value,
    ({ data }) => {
      console.log(data);
      inquiry.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const getComments = () => {
  console.log(inquiryNo.value + "번글 댓글 얻으러 가자!!!");
  getCommentListByInquiryNo(
    inquiryNo.value,
    ({ data }) => {
      console.log(data);
      commentList.value = data;
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
  router.push({ name: "qna-modify", params: inquiryNo.value });
}

function onDeleteInquiry() {
  Swal.fire({
    title: "정말 삭제하시겠습니까?",
    text: "삭제하시면 되돌릴 수 없습니다!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonColor: "#198754",
    confirmButtonText: "네, 삭제하겠습니다!",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      // API 호출
      deleteInquiry(
        inquiryNo.value,
        ({ data }) => {
          console.log(data);
          Swal.fire({
            title: "Q&A 삭제 완료",
            icon: "success",
          });
          router.push({ name: "qna-list" });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  });
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
        <QnaCommentFormItem @insert-comment="getComments" />
        <QnaCommentListItem
          v-for="comment in commentList"
          :key="comment.commentNo"
          :comment="comment"
          @get-comments="getComments"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Nanum Gothic", sans-serif !important;
}
</style>
