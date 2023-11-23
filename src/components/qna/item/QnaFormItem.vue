<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createInquiry, getModifyInquiry, modifyInquiry } from "@/api/qna";
import Swal from "sweetalert2";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);

const router = useRouter();
const route = useRoute();

const props = defineProps({ type: String });

// 이거 뭐에 쓰이는거지?!?!?!??!
const isUseId = ref(false);

const inquiry = ref({
  qnaNo: 0,
  title: "",
  content: "",
  createdTime: "",
  modifiedTime: "",
  id: "",
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
  if (member.value != null) {
    inquiry.value.id = member.value.id;
  }
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
      Swal.fire({
        scrollbarPadding: false,
        // optional
        heightAuto: false,
        icon: "success",
        title: "Q&A 작성 완료",
      });
      router.push({ name: "qna-list" });
    },
    (error) => {
      console.log(error);
      Swal.fire({
        scrollbarPadding: false,
        // optional
        heightAuto: false,
        icon: "error",
        title: "Q&A 작성 실패",
        text: "다시 시도해주세요!",
      });
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
      Swal.fire({
        scrollbarPadding: false,
        // optional
        heightAuto: false,
        icon: "success",
        title: "Q&A 수정 완료",
      });
      router.push({ name: "qna-view", params: qnaNo });
    },
    (error) => {
      console.log(error);
      Swal.fire({
        scrollbarPadding: false,
        // optional
        heightAuto: false,
        icon: "error",
        title: "Q&A 수정 실패",
        text: "다시 시도해주세요!",
      });
    }
  );
}

function moveList() {
  let temp = props.type == "regist" ? "작성" : "수정";
  Swal.fire({
    scrollbarPadding: false,
    // optional
    heightAuto: false,
    title: "정말 이동하시겠습니까?",
    text: temp + "중인 글이 사라집니다!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonColor: "#198754",
    confirmButtonText: "네, 이동하겠습니다!",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      router.push({ name: "qna-list" });
    }
  });
}
</script>

<template>
  <form @submit.prevent="onSubmit">
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
