<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createInquiry, getModifyInquiry, modifyInquiry } from "@/api/qna";

const router = useRouter();
const route = useRoute();

const props = defineProps({ type: String });

// 이거 뭐에 쓰이는거지?!?!?!??!
const isUseId = ref(false);

const inquiry = ref({
  qnaNo: 0,
  content: "",
  createdTime: "",
  modifiedTime: "",
  id: "ssafy", // 이거 나중에 ssafy에서 바꿔야!!
});

if (props.type === "modify") {
  let { qnaNo } = route.params;
  console.log(qnaNo + "번글 얻어와서 수정할거야");
  // API 호출
  isUseId.value = true;
  getModifyInquiry(qnaNo, ({ data }) => {
    console.log(data);
    inquiry.value = data;
  });
}

const titleErrMsg = ref("");
const contentErrMsg = ref("");
// watch : 바뀌었을때를 감지
watch(
  () => inquiry.value.title,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 45) {
      titleErrMsg.value = "제목을 확인해 주세요!!!";
    } else titleErrMsg.value = "";
  },
  // 처음 페이지 들어왔을때는 감시 안됨 => immediate:true로 처음 들어오자마자 한번 실행하고 감시
  { immediate: true }
);
watch(
  () => inquiry.value.content,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 100) {
      contentErrMsg.value = "내용을 확인해 주세요!!!";
    } else contentErrMsg.value = "";
  },
  { immediate: true }
);

function onSubmit() {
  // event.preventDefault();

  if (titleErrMsg.value) {
    alert(titleErrMsg.value);
  } else if (contentErrMsg.value) {
    alert(contentErrMsg.value);
  } else {
    props.type === "regist" ? writeInquiry() : updateInquiry();
  }
}

function writeInquiry() {
  console.log("글등록하자!!", inquiry.value);
  // API 호출
  isUseId.value = true;
  createInquiry(
    inquiry.value,
    ({ data }) => {
      console.log(data);
      alert("글 작성이 완료되었습니다.");
      router.push({ name: "qna-list" });
    },
    (error) => {
      console.log(error);
    }
  );
}

function updateInquiry() {
  console.log(inquiry.value.inquiryNo + "번글 수정하자!!", inquiry.value);
  let { qnaNo } = route.params;
  // API 호출
  modifyInquiry(
    qnaNo,
    inquiry.value,
    ({ data }) => {
      console.log(data);
      router.push({ name: "qna-view", params: qnaNo });
    },
    (error) => {
      console.log(error);
    }
  );
}

function moveList() {
  router.push({ name: "qna-list" });
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="id" class="form-label">작성자 ID : </label>
      <input
        type="text"
        class="form-control"
        v-model="inquiry.id"
        :disabled="isUseId"
        placeholder="작성자ID"
      />
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목 : </label>
      <input type="text" class="form-control" v-model="inquiry.title" placeholder="제목" />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용 : </label>
      <textarea class="form-control" v-model="inquiry.content" rows="10"></textarea>
    </div>
    <div class="col-auto text-center">
      <button type="submit" class="btn btn-outline-primary mb-3" v-if="type === 'regist'">
        글작성
      </button>
      <button type="submit" class="btn btn-outline-success mb-3" v-else>글수정</button>
      <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">
        목록으로
      </button>
    </div>
  </form>
</template>

<style scoped></style>
