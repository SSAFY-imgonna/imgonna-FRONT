<script setup>
import { ref } from "vue";
import { userFindPassword } from "@/api/member";

import Swal from "sweetalert2";
import MemberResetPw from "./MemberResetPw.vue";

const emit = defineEmits(["finished"]);
const oldPw = ref("");
const modalType = ref("findPw");

const showWarning = (text) => {
  Swal.fire({
    icon: "warning",
    text: text,
  });
};
const param = ref({ email: "", name: "", phone: "" });

const findPw = async () => {
  if (!param.value.email) {
    showWarning("이메일을 입력해주세요!");
  } else if (!param.value.id) {
    showWarning("아이디를 입력해주세요!");
  } else if (!param.value.phone) {
    showWarning("전화번호를 입력해주세요!");
  } else {
    userFindPassword(
      param.value,
      ({ data }) => {
        console.log(data);

        // emit("finished");
        oldPw.value = data;
        modalType.value = "resetPw";
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "비밀번호 재설정",
          text: "일치하는 정보가 없습니다. 다시 시도해주세요!",
        });
        modalType.value = "findPw";
        finished();
      }
    );
  }
  // router.push("/");s
};

const finished = () => {
  emit("finished");
};
</script>

<template>
  <div v-if="modalType == 'findPw'">
    <p class="fs-3 mb-4">비밀번호 재설정</p>
    <form action="" method="post" id="loginForm">
      <div class="input-group mt-2" id="input-group">
        <span class="input-group-text">아이디</span>
        <input
          type="text"
          class="form-control"
          placeholder="아이디를 입력하세요"
          v-model="param.id"
        />
      </div>
      <div class="input-group mt-1" id="input-group">
        <span class="input-group-text">이메일</span>
        <input
          type="text"
          class="form-control"
          placeholder="이메일을 입력하세요"
          v-model="param.email"
        />
      </div>
      <div class="input-group mt-1" id="input-group">
        <span class="input-group-text">전화번호</span>
        <input
          type="text"
          class="form-control"
          placeholder="전화번호를 입력하세요"
          v-model="param.phone"
        />
      </div>
    </form>
    <div id="footer">
      <button type="button" @click="findPw" class="btn ms-5 btn-secondary">재설정</button>
    </div>
  </div>
  <MemberResetPw
    v-if="modalType == 'resetPw'"
    @finished="finished()"
    :old-pw="oldPw"
    :id="param.id"
  />
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
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
  padding-top: 150px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

#modalBody {
  width: 500px;
  height: 280px;
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
  text-align: center;
  margin-top: 20px;
}
</style>
