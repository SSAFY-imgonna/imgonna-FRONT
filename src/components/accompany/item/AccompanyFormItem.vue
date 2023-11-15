<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { createAccompany, getModifyAccompany, modifyAccompany } from "@/api/accompany";

const router = useRouter();
const route = useRoute();

const props = defineProps({ type: String });

const accompany = ref({
  accompanyNo: 0,
  title: "",
  content: "",
  addr: "",
  joinTime: "",
  limitNum: "",
  status: "",
  theme_no: "",
  createdTime: "",
  modifiedTime: "",
  upfile: "",
  status: "",
  themeNo: "",
  id: "ssafy", // 이거 나중에 ssafy에서 바꿔야!!
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

function onSubmit() {
  // event.preventDefault();

  if (titleErrMsg.value) {
    alert(titleErrMsg.value);
  } else if (contentErrMsg.value) {
    alert(contentErrMsg.value);
  } else {
    props.type === "regist" ? writeAccompany() : updateAccompany();
  }
}

function writeAccompany() {
  console.log("글등록하자!!", accompany.value);
  const formData = new FormData();

  formData.append("title", accompany.value.title);
  formData.append("content", accompany.value.content);
  formData.append("addr", accompany.value.addr);
  formData.append("date", accompany.value.date);
  formData.append("time", accompany.value.time);
  formData.append("limitNum", accompany.value.limitNum);
  formData.append("status", accompany.value.status);
  formData.append("themeNo", accompany.value.themeNo);

  // Get the file input element
  const upfileInput = document.getElementById("upfile");
  console.log(upfileInput.files[0]);
  // Check if a file is selected
  if (upfileInput.files.length > 0) {
    // Append the first selected file to the FormData object
    formData.append("upfile", upfileInput.files[0]);
  }
  console.log(formData);
  // API 호출
  isUseId.value = true;
  createAccompany(
    formData,
    ({ data }) => {
      console.log(data);
      alert("글 작성이 완료되었습니다.");
      router.push({ name: "accompany-list" });
    },
    (error) => {
      console.log(error);
    }
  );
}

function updateAccompany() {
  console.log(accompany.value.accompanyNo + "번글 수정하자!!", accompany.value);
  let { accompanyNo } = route.params;
  // API 호출
  modifyAccompany(
    accompanyNo,
    accompany.value,
    ({ data }) => {
      console.log(data);
      router.push({ name: "accompany-view", params: accompanyNo });
    },
    (error) => {
      console.log(error);
    }
  );
}

function deleteDiv() {
  let fileNameDiv = document.getElementById("fileNameDiv");
  fileNameDiv.style.display = "none";
  let originFile = document.getElementById("originFile");
  originalFile.value = "";
  removeFile();
}

function removeFile() {
  let upfile = document.getElementById("upfile");
  upfile.value = "";
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
      <input class="form-control" type="file" id="upfile" name="upfile" accept="image/*" />
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
    <input type="hidden" value="{{accompany.originalFile}}" id="originFile" name="originFile" />

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
            checked
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
            value="모집종료"
            v-model="accompany.status"
          />
          <label class="form-check-label" for="inlineRadio3">모집종료</label>
        </div>
      </div>
    </div>
    <div class="col-12">
      <label for="status" class="form-label">테마분류</label>
      <select
        class="form-select"
        id="themeNo"
        name="themeNo"
        aria-label="Default select example"
        v-model="accompany.themeNo"
      >
        <option selected>테마를 선택해주세요</option>
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
      <button type="button" id="btn-list" class="btn btn-secondary">취소</button>
    </div>
  </form>
</template>

<style scoped>
a.text-danger:hover {
  cursor: pointer;
}
</style>
