<script setup>
import { ref } from "vue";
import { doModify } from "@/api/member";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import Swal from "sweetalert2";
const imageUrl = new URL("@/assets/img/springboot/upload/", import.meta.url).href;

const memberStore = useMemberStore();
const { isLogin, userInfo } = storeToRefs(memberStore);

const modifyParam = ref(userInfo);
console.log(modifyParam.value);

const showWarning = (text) => {
  Swal.fire({
    icon: "warning",
    text: text,
  });
};

const modifySubmit = () => {
  if (!modifyParam.value.name) {
    showWarning("이름은 필수 입력값입니다!");
  } else if (!modifyParam.value.nickname) {
    showWarning("닉네임은 필수 입력값입니다!");
  } else if (!modifyParam.value.phone) {
    showWarning("전화번호는 필수 입력값입니다!");
  } else {
    console.log(modifyParam.value);

    // 파일
    const formData = new FormData();
    formData.append("id", modifyParam.value.id);
    formData.append("name", modifyParam.value.name);
    formData.append("nickname", modifyParam.value.nickname);
    formData.append("phone", modifyParam.value.phone);
    formData.append("mbti", modifyParam.value.mbti);
    formData.append("email", modifyParam.value.email);
    formData.append("introduction", modifyParam.value.introduction);

    // Get the file input element
    const upfileInput = document.getElementById("upfile2");
    console.log(upfileInput.files[0]);
    // Check if a file is selected
    if (upfileInput.files.length > 0) {
      // Append the first selected file to the FormData object
      formData.append("upfile", upfileInput.files[0]);
    }
    console.log(formData);
    doModify(
      modifyParam.value.id,
      formData,
      ({ data }) => {
        console.log(data);
        userInfo.value = data;
        Swal.fire({
          icon: "success",
          title: "회원정보 수정 성공",
        });
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "회원정보 수정 실패",
          text: "다시 시도해주세요!",
        });
        console.log(error);
      }
    );
  }
};

const mbtiList = ref([
  { text: "ESFP", value: "ESFP" },
  { text: "ENFP", value: "ENFP" },
  { text: "ENTP", value: "ENTP" },
  { text: "ESTP", value: "ESTP" },
  { text: "ESFJ", value: "ESFJ" },
  { text: "ESTJ", value: "ESTJ" },
  { text: "ENTJ", value: "ENTJ" },
  { text: "ENFJ", value: "ENFJ" },
  { text: "ISFP", value: "ISFP" },
  { text: "INTP", value: "INTP" },
  { text: "ISTP", value: "ISTP" },
  { text: "INFP", value: "INFP" },
  { text: "ISFJ", value: "ISFJ" },
  { text: "ISTJ", value: "ISTJ" },
  { text: "INTJ", value: "INTJ" },
  { text: "INFJ", value: "INFJ" },
]);

const removePhoto = () => {
  modifyParam.value.photo = "";
};
</script>

<template>
  <section id="book-a-table" class="book-a-table">
    <div class="row">
      <div class="col-lg-3 ms-5 mx-5 mb-5">
        <div class="card mb-4">
          <div class="card-body text-center">
            <p class="mt-5 my-3 fs-5">프로필사진</p>

            <i v-if="!modifyParam.photo" style="font-size: 120px" class="bi bi-person-circle"></i>

            <img
              v-else
              :src="`${imageUrl}/${modifyParam.photo}`"
              alt=""
              style="width: 150px; height: 150px"
              class="rounded-circle img-fluid me-2 mb-5"
            />

            <div class="input-group mb-3">
              <div class="col-sm-10 ms-4">
                <input
                  type="file"
                  class="form-control p-1"
                  id="upfile2"
                  name="upfile2"
                  accept="image/*"
                />
              </div>
            </div>

            <button class="btn btn-outline-danger p-1 mt-2 mb-5" @click="removePhoto">
              사진 삭제
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card mb-4 p-5">
          <div class="card-body">
            <div class="row">
              <div class="input-group mb-3">
                <div class="col-sm-2">
                  <p class="mb-0 fs-6">아이디</p>
                </div>
                <div class="col-sm-5">
                  <input
                    type="text"
                    class="form-control-plaintext"
                    v-model="modifyParam.id"
                    readonly
                  />
                </div>
              </div>
              <div class="input-group mb-3">
                <div class="col-sm-2">
                  <p class="mb-0 fs-6">이메일</p>
                </div>
                <div class="col-sm-5">
                  <input
                    type="text"
                    class="form-control-plaintext"
                    v-model="modifyParam.email"
                    readonly
                  />
                </div>
              </div>
              <div class="input-group mb-3">
                <div class="col-sm-2">
                  <p class="mb-0 fs-6">이름</p>
                </div>
                <div class="col-sm-5">
                  <input type="text" class="form-control p-1" v-model="modifyParam.name" />
                </div>
              </div>
              <div class="input-group mb-3">
                <div class="col-sm-2">
                  <p class="mb-0 fs-6">연락처</p>
                </div>
                <div class="col-sm-5">
                  <input type="text" class="form-control p-1" v-model="modifyParam.phone" />
                </div>
              </div>
              <div class="input-group mb-3">
                <div class="col-sm-2">
                  <p class="mb-0 fs-6">MBTI</p>
                </div>
                <div class="col-sm-5">
                  <select class="form-select p-1" v-model="modifyParam.mbti">
                    <option selected disabled>MBTI 선택</option>
                    <option v-for="mbti in mbtiList" :key="mbti.text" :value="mbti.value">
                      {{ mbti.text }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="input-group mb-3">
                <div class="col-sm-2">
                  <p class="mb-0 fs-6">소개글</p>
                </div>
                <div class="col-sm-5">
                  <textarea
                    class="form-control p-1"
                    id="introduction"
                    type="text"
                    maxlength="255"
                    rows="3"
                    cols="30"
                    v-model="modifyParam.introduction"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="footer">
          <input
            type="button"
            class="p-2 px-4 btn-book-a-table"
            @click="modifySubmit"
            value="수정"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#book-a-table {
}

.isValid {
  text-align: center;
  margin-top: -15px;
  margin-bottom: -10px;
  color: green;
}

.isInvalid {
  text-align: center;
  margin-top: -15px;
  margin-bottom: -10px;
  color: red;
}

#footer {
  text-align: right;
  margin-top: 20px;
}
</style>
