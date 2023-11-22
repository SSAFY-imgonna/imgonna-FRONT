<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createAccompany, getModifyAccompany, modifyAccompany } from "@/api/accompany";
import Swal from "sweetalert2";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);

const router = useRouter();
const route = useRoute();

const props = defineProps({ type: String });

const upfile = ref(null);

const fileChange = () => {
  console.log(upfile.value.files[0]);
};

const accompany = ref({
  accompanyNo: 0,
  title: "",
  content: "",
  addr: "",
  joinTime: "",
  limitNum: "",
  date: "",
  time: "",
  status: "모집중",
  theme_no: "",
  createdTime: "",
  modifiedTime: "",
  upfile: "",
  themeNo: "",
  id: "",
});

const isUseId = ref(false);

if (props.type === "modify") {
  let { accompanyNo } = route.params;
  console.log(accompanyNo + "번글 얻어와서 수정할거야");
  // API 호출
  isUseId.value = true;
  getModifyAccompany(accompanyNo, ({ data }) => {
    console.log(data);
    accompany.value = data;
  });
}

const titleErrMsg = ref("");
const contentErrMsg = ref("");
// watch : 바뀌었을때를 감지
watch(
  () => accompany.value.title,
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
  () => accompany.value.content,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 100) {
      contentErrMsg.value = "내용을 확인해 주세요!!!";
    } else contentErrMsg.value = "";
  },
  { immediate: true }
);

const showWarning = (text) => {
  Swal.fire({
    icon: "warning",
    text: text,
  });
};

function onSubmit() {
  console.log(accompany);
  if (!accompany.value.title) {
    showWarning("제목은 필수 입력값입니다!");
    return;
  } else if (!accompany.value.content) {
    showWarning("내용은 필수 입력값입니다!");
    return;
  } else if (!accompany.value.addr) {
    showWarning("모임장소는 필수 입력값입니다!");
    return;
  } else if (!accompany.value.date) {
    showWarning("모임날짜는 필수 입력값입니다!");
    return;
  } else if (!accompany.value.time) {
    showWarning("모임시간은 필수 입력값입니다!");
    return;
  } else if (!accompany.value.limitNum) {
    showWarning("모집인원은 필수 입력값입니다!");
    return;
  } else if (accompany.value.currentNum > accompany.value.limitNum) {
    showWarning("현재신청인원이 모집인원보다 많습니다. 확인해주세요.");
    return;
  } else if (
    accompany.value.currentNum == accompany.value.limitNum &&
    accompany.value.status == "모집중"
  ) {
    showWarning("현재 모집인원이 모두 차서 모집중으로 변경 불가합니다.");
    accompany.value.status = "모집완료";
    return;
  } else if (!accompany.value.themeNo) {
    showWarning("테마분류는 필수 입력값입니다!");
    return;
  } else {
    props.type === "regist" ? writeAccompany() : updateAccompany();
  }
}

function writeAccompany() {
  if (member.value != null) {
    accompany.value.id = member.value.id;
  }

  console.log("글등록하자!!", accompany.value);
  const formData = new FormData();

  formData.append("id", accompany.value.id);
  formData.append("title", accompany.value.title);
  formData.append("content", accompany.value.content);
  formData.append("addr", accompany.value.addr);
  formData.append("date", accompany.value.date);
  formData.append("time", accompany.value.time);
  formData.append("limitNum", accompany.value.limitNum);
  formData.append("status", accompany.value.status);
  formData.append("themeNo", accompany.value.themeNo);

  if (upfile.value.files.length > 0) {
    // 업로드할 파일이 존재하면, formData에 추가함
    formData.append("upfile", upfile.value.files[0]);
  }
  console.log(formData);
  // API 호출
  isUseId.value = true;
  createAccompany(
    formData,
    ({ data }) => {
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "동행 글 작성 완료",
      });
      router.push({ name: "accompany-list" });
    },
    (error) => {
      Swal.fire({
        icon: "error",
        title: "동행 글 작성 실패",
        text: "다시 시도해주세요!",
      });
      console.log(error);
    }
  );
}

function updateAccompany() {
  const formData = new FormData();

  formData.append("title", accompany.value.title);
  formData.append("content", accompany.value.content);
  formData.append("addr", accompany.value.addr);
  formData.append("date", accompany.value.date);
  formData.append("time", accompany.value.time);
  formData.append("limitNum", accompany.value.limitNum);
  formData.append("status", accompany.value.status);
  formData.append("themeNo", accompany.value.themeNo);

  const upfileInput = document.getElementById("upfile"); // 새 파일

  if (accompany.value.fileInfos.length > 0) {
    const originFile = accompany.value.fileInfos[0].originalFile; // 기존 파일

    // 기존 파일이 존해하면, formData에 추가함
    if (originFile != null && originFile.length > 0) {
      formData.append("originFile", originFile);
    }
  }
  // 업로드할 파일이 존재하면, formData에 추가함
  if (upfile.value.files.length > 0) {
    formData.append("upfile", upfile.value.files[0]);
  }

  let { accompanyNo } = route.params;
  // API 호출
  modifyAccompany(
    accompanyNo,
    formData,
    ({ data }) => {
      Swal.fire({
        icon: "success",
        title: "동행 글 수정 완료",
      });
      router.push({ name: "accompany-view", params: { accompanyNo: accompanyNo } });
    },
    (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "동핼 글 수정 실패",
        text: "다시 시도해주세요!",
      });
    }
  );
}

function deleteDiv() {
  let fileNameDiv = document.getElementById("fileNameDiv");
  fileNameDiv.style.display = "none";
  accompany.value.fileInfos[0].originalFile = "";
}

function moveList() {
  Swal.fire({
    title: "정말 이동하시겠습니까?",
    text: "작성중인 글이 사라집니다!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonColor: "#198754",
    confirmButtonText: "네, 이동하겠습니다!",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      router.push({ name: "accompany-list" });
    }
  });
}

function moveView() {
  Swal.fire({
    title: "정말 이동하시겠습니까?",
    text: "수정중인 글이 사라집니다!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonColor: "#198754",
    confirmButtonText: "네, 이동하겠습니다!",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      router.push({ name: "accompany-view" });
    }
  });
}
</script>

<template>
  <!-- Vertical Form -->
  <form
    id="form-register"
    class="row g-3"
    method="post"
    enctype="multipart/form-data"
    @submit.prevent="onSubmit"
  >
    <input type="hidden" name="pgno" value="1" />
    <input type="hidden" name="key" value="" />
    <input type="hidden" name="word" value="" />
    <div class="col-12">
      <label for="title" class="form-label">제목</label>
      <input type="text" class="form-control" id="title" name="title" v-model="accompany.title" />
    </div>
    <div class="col-12">
      <label for="content" class="form-label">내용</label>
      <textarea
        class="form-control"
        style="height: 100px"
        id="content"
        name="content"
        v-model="accompany.content"
      ></textarea>
    </div>
    <div class="col-12">
      <label for="addr" class="form-label">장소</label>
      <input type="text" class="form-control" id="addr" name="addr" v-model="accompany.addr" />
    </div>
    <div class="col-6">
      <label for="date" class="form-label">날짜</label>
      <input type="date" class="form-control" id="date" name="date" v-model="accompany.date" />
    </div>
    <div class="col-6">
      <label for="time" class="form-label">시간</label>
      <input type="time" class="form-control" id="time" name="time" v-model="accompany.time" />
    </div>
    <div class="col-12">
      <label for="limitNum" class="form-label">모집인원</label>
      <input
        type="number"
        class="form-control"
        min="1"
        max="10"
        id="limitNum"
        name="limitNum"
        v-model="accompany.limitNum"
      />
    </div>
    <div class="col-12">
      <label for="upfile" class="form-label">사진</label>
      <input
        ref="upfile"
        class="form-control"
        type="file"
        id="upfile"
        name="upfile"
        accept="image/*"
        @change="fileChange"
      />
    </div>

    <div
      class="file-input ms-1"
      id="fileNameDiv"
      v-if="accompany.fileInfos && accompany.fileInfos.length > 0"
    >
      <font-awesome-icon icon="fa-solid fa-camera" />
      {{ accompany.fileInfos[0].originalFile }}
      <a class="text-danger ms-1" @click="deleteDiv">
        <font-awesome-icon icon="fa-solid fa-xmark" size="lg" style="color: #ec3609" />
      </a>
    </div>
    <!-- <input type="hidden" value="{{accompany.originalFile}}" id="originFile" name="originFile" /> -->

    <div class="col-12">
      <label for="status" class="form-label">모집상태</label>
      <div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="status"
            id="inlineRadio1"
            value="모집중"
            v-model="accompany.status"
          />
          <label class="form-check-label" for="inlineRadio1">모집중</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="status"
            id="inlineRadio2"
            value="모집중단"
            v-model="accompany.status"
          />
          <label class="form-check-label" for="inlineRadio2">모집중단</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            name="status"
            id="inlineRadio3"
            value="모집완료"
            v-model="accompany.status"
          />
          <label class="form-check-label" for="inlineRadio3">모집완료</label>
        </div>
      </div>
    </div>
    <div class="col-12">
      <label for="theme" class="form-label">테마분류</label>
      <select
        class="form-select"
        id="themeNo"
        name="themeNo"
        aria-label="Default select example"
        v-model="accompany.themeNo"
      >
        <option value="" selected>테마를 선택해주세요</option>
        <option value="1">가족</option>
        <option value="2">우정</option>
        <option value="3">연인</option>
        <option value="4">혼자</option>
        <option value="5">MBTI</option>
      </select>
    </div>
    <div class="text-center">
      <button type="submit" id="btn-register" class="btn btn-primary" v-if="type === 'regist'">
        전송
      </button>
      <button type="submit" id="btn-register" class="btn btn-primary" v-else>글수정</button>
      <button
        v-if="type == 'regist'"
        type="button"
        id="btn-list"
        class="btn btn-secondary"
        @click="moveList"
      >
        목록으로
      </button>
      <button
        v-else-if="type == 'modify'"
        type="button"
        id="btn-list"
        class="btn btn-secondary"
        @click="moveView"
      >
        돌아가기
      </button>
    </div>
  </form>
</template>

<style scoped>
@import "@/assets/css/accompany.css";
a.text-danger:hover {
  cursor: pointer;
}
</style>
