<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createAccompanyComment } from "@/api/accompanyComment";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);

const router = useRouter();
const route = useRoute();

const { accompanyNo } = route.params;

const emit = defineEmits(["insertComment"]);
const insertEvent = function () {
  emit("insertComment");
};
const comment = ref({
  accompanyNo: accompanyNo,
  content: "",
  createdTime: "",
  modifiedTime: "",
  id: "",
});

const commentLength = ref(50);
const contentErrMsg = ref("");
watch(
  () => comment.value.content,
  (value) => {
    let len = value.length;
    console.log(len);
    commentLength.value = len;
    if (len > 50) {
      comment.value.content = comment.value.content.substring(0, 50);
    } else contentErrMsg.value = "";
  },
  // 처음 페이지 들어왔을때는 감시 안됨 => immediate:true로 처음 들어오자마자 한번 실행하고 감시
  { immediate: true }
);

function onSubmit() {
  if (contentErrMsg.value) {
    alert(contentErrMsg.value);
  } else {
    writeComment();
  }
}

function writeComment() {
  if (member.value != null) {
    comment.value.id = member.value.id;
  }
  console.log("댓글등록하자!!", comment.value);
  // API 호출
  createAccompanyComment(
    accompanyNo,
    comment.value,
    ({ data }) => {
      console.log(data);
      insertEvent();
      comment.value.content = "";
    },
    (error) => {
      console.log(error);
    }
  );
}
</script>

<template>
  <div id="comment-div" class="mt-0">
    <div class="mb-2 ps-1">
      <span class="comm-title" style="font-size: 15pt">댓글</span>&nbsp;
      <span id="comm-first"
        ><span class="letter-count">{{ commentLength }}/50</span></span
      >
    </div>
    <form id="form-comm" @submit.prevent="onSubmit">
      <div class="inner-text" v-if="member">
        <textarea
          class="form-control comm-content inner-text"
          name="commContent"
          id="commContent"
          v-model="comment.content"
        ></textarea>
        <button type="submit" class="btn btn-outline-dark" id="inner-submit">
          <font-awesome-icon icon="fa-solid fa-reply" />
        </button>
      </div>
      <div class="inner-text" v-else>
        <textarea
          class="form-control comm-content inner-text"
          name="commContent"
          id="commContent"
          disabled="disabled"
        >
  로그인 후 작성가능합니다</textarea
        >
        <button type="submit" class="btn btn-outline-dark" id="inner-submit">
          <i class="bi bi-send-fill" style="display: none"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<style>
@import "@/assets/css/accompany.css";
/* 댓글 부분 */
div.inner-text {
  display: inline-block;
  position: relative;
}
.inner-text {
  display: block;
  height: 130px;
  width: 100%;
  resize: none;
}
#inner-submit {
  position: absolute;
  bottom: 0px;
  right: 0px;
  border: none;
}
#comment-div {
  padding: 20px 10px 20px 10px;
  margin-top: 10px;
  background-color: #fafafa;
  border-radius: 5px;
}
</style>
