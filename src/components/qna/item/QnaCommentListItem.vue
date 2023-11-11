<script setup>
import { deleteComment } from "@/api/qnaComment";

defineProps({
  comment: Object,
});

const emit = defineEmits(["getComments"]);

const getComments = () => {
  emit("getComments");
};

const onDeleteComment = (comment) => {
  console.log("comment: " + comment);
  const qnaNo = comment.qnaNo;
  const commentNo = comment.commentNo;
  console.log(qnaNo + "번글 " + commentNo + "번 댓글 삭제하러 가자!!!");
  // API 호출
  deleteComment(
    qnaNo,
    commentNo,
    ({ data }) => {
      console.log(data);
      alert("댓글 삭제가 완료되었습니다.");
      getComments();
    },
    (error) => {
      console.log(error);
    }
  );
};
</script>

<template>
  <div class="divider mb-3"></div>
  <div class="item">
    <!-- <b><h5>data.list[idx].id</h5></b> -->
    <div class="sub-item">
      <div class="mb-2 mContent">{{ comment.content }}</div>
      <span class="reg-date">{{ comment.createdTime }} </span>

      <!-- 로그인한 회원과 댓글 작성자의 회원번호 일치한다면 => 수정과 삭제 버튼 보이게 -->
      <div style="float: right; margin-bottom: 10px">
        <button type="button" class="modify-btn btn btn-outline-primary me-1">수정</button>
        <button
          type="button"
          class="delete-btn btn btn-outline-danger"
          @click="onDeleteComment(comment)"
        >
          삭제
        </button>
      </div>
      <hr size="1" noshade="noshade" width="100%" />
    </div>
  </div>
  <!-- <div class="paging-button" style="display: none">
    <input class="btn btn-outline-secondary" type="button" value="더보기" />
  </div> -->
  <!-- <div id="loading" style="display: none">
    <img src="${root}/assets/img/loading.gif" width="50" height="50" />
  </div> -->
</template>

<style scoped></style>
