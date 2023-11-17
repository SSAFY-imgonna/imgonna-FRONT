<script setup>
import { ref } from "vue";
import { doModify } from "@/api/member";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import Swal from "sweetalert2";
const memberStore = useMemberStore();
const { isLogin, userInfo } = storeToRefs(memberStore);

const modifyParam = ref(userInfo.value);
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
    doModify(
      // modifyParam.value.id,
      modifyParam.value,
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
</script>

<template>
  <section id="book-a-table" class="book-a-table">
    <div class="container" id="modify-form" data-aos="fade-up">
      <form method="post">
        <div class="input-group mb-3">
          <span class="input-group-text">아이디</span>
          <input type="text" class="form-control" v-model="modifyParam.id" readonly />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">이름</span>
          <input type="text" class="form-control" v-model="modifyParam.name" />
          <span class="input-group-text">닉네임</span>
          <input type="text" class="form-control" v-model="modifyParam.nickname" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">연락처</span>
          <input type="tel" class="form-control" v-model="modifyParam.phone" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">MBTI</span>
          <select class="form-select" v-model="modifyParam.mbti">
            <option selected disabled>MBTI 선택</option>
            <option v-for="mbti in mbtiList" :key="mbti.text" :value="mbti.value">
              {{ mbti.text }}
            </option>
          </select>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">이메일</span>
          <input type="tel" class="form-control" v-model="modifyParam.email" readonly />
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

        <div class="input-group mb-3">
          <span class="input-group-text">프로필사진</span>
          <input type="file" class="form-control" id="inputGroupFile02" />
        </div>
      </form>
      <div id="footer">
        <input type="button" class="btn btn-secondary" @click="modifySubmit" value="수정" />
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

#modify-form {
  width: 50%;
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
  margin-top: 30px;
}
</style>
