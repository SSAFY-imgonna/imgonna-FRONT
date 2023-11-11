<script setup>
import { ref } from "vue";
import { deleteComment, modifyQnaComment } from "@/api/qnaComment";

const props = defineProps({
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

const isEditing = ref(false);
const ModifyComment = () => {
  isEditing.value = true;
};

const editingContent = ref(props.comment.content);

const saveChanges = () => {
  const qnaNo = props.comment.qnaNo;
  const commentNo = props.comment.commentNo;
  props.comment.content = editingContent;
  console.log(props.comment.content);
  // API 호출
  modifyQnaComment(
    qnaNo,
    commentNo,
    props.comment,
    ({ data }) => {
      // router.push({ name: "qna-view", params: qnaNo });
      getComments();
    },
    (error) => {
      console.log(error);
    }
  );
  // 성공적으로 저장되면 isEditing을 false로 설정
  isEditing.value = false;
};

const cancelEditing = () => {
  // 수정을 취소하면 isEditing을 false로 설정
  isEditing.value = false;
};
</script>

<template>
  <div class="divider mb-3"></div>
  <div class="item">
    <!-- <b><h5>data.list[idx].id</h5></b> -->
    <!-- 기존 댓글 -->
    <div v-if="!isEditing" class="sub-item">
      <div class="mb-2 mContent">{{ comment.content }}</div>
      <span class="reg-date">{{ comment.createdTime }} </span>

      <!-- 로그인한 회원과 댓글 작성자의 회원번호 일치한다면 => 수정과 삭제 버튼 보이게 -->
      <div style="float: right; margin-bottom: 10px">
        <button
          type="button"
          class="modify-btn btn btn-outline-primary me-1"
          @click="ModifyComment"
        >
          수정
        </button>
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

    <!-- 수정중인 댓글 -->
    <div v-else class="sub-item">
      <div id="comm-first"><span class="letter-count">50/50</span></div>
      <div class="inner-text">
        <textarea
          class="form-control mcomm-content inner-text"
          name="commentContent"
          id="commentContent"
          v-model="editingContent"
        ></textarea>
      </div>
      <div id="comm-second" class="align-right">
        <div style="float: right; margin-bottom: 10px">
          <button
            type="button"
            class="comm-modify btn btn-outline-primary me-1"
            @click="saveChanges"
          >
            저장
          </button>
          <button type="button" class="comm-reset btn btn-outline-secondary" @click="cancelEditing">
            취소
          </button>
        </div>
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
