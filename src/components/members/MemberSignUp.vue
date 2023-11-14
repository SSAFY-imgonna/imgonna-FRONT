<script setup>
import { ref } from "vue";
import { doSignUp, checkId } from "@/api/member";
import Swal from "sweetalert2";

defineProps({
  isShownSignUpModal: Boolean,
});

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  reset();
  emit("closeModal");
};

const passwordCheck = ref("");

const email = ref({
  id: "",
  domain: "",
});

const reset = () => {
  email.value.id = "";
  email.value.domain = "";
  passwordCheck.value = "";
  signUpParam.value.id = "";
  signUpParam.value.password = "";
  signUpParam.value.name = "";
  signUpParam.value.nickname = "";
  signUpParam.value.phone = "";
  signUpParam.value.mbti = "";
  signUpParam.value.email = "";
  checkIdResultFlag.value = false;
  checkIdResultMsg.value = "";
};

const signUpParam = ref({
  id: "",
  password: "",
  name: "",
  nickname: "",
  phone: "",
  mbti: "",
  email: "",
});
const checkIdResultMsg = ref("");
const checkIdResultFlag = ref(false);
const checkDuplicateId = () => {
  checkId(
    { id: signUpParam.value.id },
    ({ data }) => {
      console.log(data);
      checkIdResultMsg.value = "사용 가능한 아이디입니다.";
      checkIdResultFlag.value = true;
    },
    (error) => {
      checkIdResultMsg.value = "사용 불가능한 아이디입니다.";
      checkIdResultFlag.value = false;
      signUpParam.value.id = "";
    }
  );
};

const showWarning = (text) => {
  Swal.fire({
    icon: "warning",
    text: text,
  });
};

const signUpSubmit = () => {
  if (!checkIdResultFlag.value) {
    showWarning("이메일 중복 체크는 필수입니다!");
  } else if (!signUpParam.value.password) {
    showWarning("비밀번호는 필수 입력값입니다!");
  } else if (!passwordCheck.value) {
    showWarning("비밀번호 재입력은 필수입니다!");
  } else if (signUpParam.value.password != passwordCheck.value) {
    showWarning("비밀번호를 확인해주세요!");
  } else if (!signUpParam.value.name) {
    showWarning("이름은 필수 입력값입니다!");
  } else if (!signUpParam.value.nickname) {
    showWarning("닉네임은 필수 입력값입니다!");
  } else if (!signUpParam.value.phone) {
    showWarning("전화번호는 필수 입력값입니다!");
  } else if (!email.value.id || !email.value.domain) {
    showWarning("이메일은 필수 입력값입니다!");
  } else {
    signUpParam.value.email = email.value.id + email.value.domain;
    console.log(signUpParam.value);
    doSignUp(
      signUpParam.value,
      ({ data }) => {
        console.log(data);
        closeModal();
        Swal.fire({
          icon: "success",
          title: "회원가입 성공",
          text: "로그인 해주세요!",
        });
      },
      (error) => {
        closeModal();
        Swal.fire({
          icon: "error",
          title: "회원가입 실패",
          text: "다시 시도해주세요!",
        });
        console.log(error);
      }
    );
  }
};

const mbtiList = ref([
  { text: "ESFP", value: "esfp" },
  { text: "ENFP", value: "enfp" },
  { text: "ENTP", value: "entp" },
  { text: "ESTP", value: "estp" },
  { text: "ESFJ", value: "esfj" },
  { text: "ESTJ", value: "estj" },
  { text: "ENTJ", value: "entj" },
  { text: "ENFJ", value: "enfj" },
  { text: "ISFP", value: "isfp" },
  { text: "INTP", value: "intp" },
  { text: "ISTP", value: "istp" },
  { text: "INFP", value: "infp" },
  { text: "ISFJ", value: "isfj" },
  { text: "ISTJ", value: "istj" },
  { text: "INTJ", value: "intj" },
  { text: "INFJ", value: "infj" },
]);

const onSelectMbti = () => {
  signUpParam.value.mbti = key.value;
};
</script>

<template>
  <div id="modalWrap" v-show="isShownSignUpModal">
    <div id="modalContent">
      <div id="modalBody">
        <span id="closeBtn" @click="closeModal">&times;</span>
        <p class="fs-3">회원가입</p>
        <form method="post" name="registerForm" id="registerForm">
          <!-- <div class="input-group mb-3">
            <span class="input-group-text">회원 유형</span>
            <span class="mx-auto">
              <input
                class="form-check-input"
                type="radio"
                name="role"
                value="general"
                id="general"
                checked="checked"
              />
              <label class="form-check-label" for="general"> 일반 회원 </label>
              <input class="form-check-input" type="radio" name="role" value="admin" id="admin" />
              <label class="form-check-label" for="admin"> 관리자 </label>
            </span>
          </div> -->
          <div class="input-group mb-3">
            <span class="input-group-text">아이디</span>
            <input type="text" class="form-control" v-model="signUpParam.id" />
            <button class="btn btn-outline-secondary" type="button" @click="checkDuplicateId">
              중복확인
            </button>
          </div>
          <p
            v-show="checkIdResultMsg"
            :class="[{ isValid: checkIdResultFlag, isInvalid: !checkIdResultFlag }]"
          >
            {{ checkIdResultMsg }}
          </p>

          <div id="showMessageElementId" class="mb-3"></div>
          <div class="input-group mb-3">
            <span class="input-group-text">비밀번호</span>
            <input
              type="password"
              class="form-control"
              name="password"
              v-model="signUpParam.password"
              required
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">비밀번호 확인</span>
            <input type="password" class="form-control" v-model="passwordCheck" />
          </div>

          <div id="showMessageElementPw" class="mb-3"></div>

          <div class="input-group mb-3">
            <span class="input-group-text">이름</span>
            <input type="text" class="form-control" v-model="signUpParam.name" />
            <span class="input-group-text">닉네임</span>
            <input type="text" class="form-control" v-model="signUpParam.nickname" />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">연락처</span>
            <input type="tel" class="form-control" v-model="signUpParam.phone" />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">MBTI</span>
            <select class="form-select" @change="onSelectMbti">
              <option selected disabled>MBTI 선택</option>
              <option v-for="mbti in mbtiList" :key="mbti.text" value="mbti.value">
                {{ mbti.text }}
              </option>
            </select>
          </div>

          <!-- <div class="input-group mb-3">
            <span class="input-group-text">소개글</span>
            <textarea
              class="form-control"
              id="introduction"
              type="text"
              maxlength="255"
              rows="3"
              cols="30"
              name="introduction"
            ></textarea>
          </div> -->

          <div class="input-group mb-3" id="input-group">
            <span class="input-group-text">이메일</span>
            <input type="text" class="form-control" placeholder="아이디" v-model="email.id" />
            <span class="input-group-text">@</span>
            <select
              class="form-select"
              id="registerEmailAdd"
              name="registerEmailAdd"
              v-model="email.domain"
            >
              <option value="" disabled>도메인 선택</option>
              <option value="@naver.com">네이버</option>
              <option value="@samsung.com">삼성</option>
              <option value="@google.com">구글</option>
            </select>
          </div>
          <div id="showMessageElementEmail" class="mb-3"></div>
          <div class="input-group mb-3">
            <span class="input-group-text">프로필사진</span>
            <input type="file" class="form-control" id="inputGroupFile02" />
          </div>
          <!-- <div class="form-check mb-3">
                  <label class="form-check-label">
                      <input class="form-check-input" type="checkbox" name="showMemberPw"> 비밀번호 보이기
                  </label>
              </div> -->

          <!-- <div class="input-group mb-3" id='select-group'>
                <span class="input-group-text">지역</span>
              <select class="form-select">
                  <option selected>시도선택</option>
                  <option value="@naver.com"></option>
                  <option value="@samsung.com">삼성</option>
                  <option value="@google.com">구글</option>
                </select>
              <select class="form-select">
                  <option selected>구군선택</option>
                  <option value="@naver.com">네이버</option>
                  <option value="@samsung.com">삼성</option>
                  <option value="@google.com">구글</option>
                </select>
            </div> -->
        </form>
        <div id="footer">
          <input type="reset" class="btn btn-outline-danger me-1" @click="reset" value="초기화" />
          <input type="button" class="btn btn-secondary" @click="signUpSubmit" value="회원가입" />
          <!-- <input
            type="button"
            class="btn btn-outline-secondary"
            value="닫기"
            data-bs-dismiss="modal"
            aria-label="close"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
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

#btnWrap {
  width: 500px;
  margin: 100px auto;
}

#popupBtn {
  width: 150px;
  height: 50px;
  padding: 10px 5px;
}

#modalWrap {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 10px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

#modalBody {
  width: 500px;
  height: 590px;
  padding: 30px 30px;
  margin: 0 auto;
  border: 1px solid #777;
  background-color: #fff;
  border-radius: 20px 20px 20px 20px;
}

#closeBtn {
  float: right;
  font-weight: bold;
  color: #777;
  font-size: 25px;
  cursor: pointer;
}

#footer {
  text-align: right;
  margin-top: 30px;
}
</style>
