<script setup>
import { ref } from "vue";
import { doLogin } from "@/api/member";
import Swal from "sweetalert2";

defineProps({
  isShownLoginModal: Boolean,
});

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};

const loginParam = ref({ id: "", password: "" });

const loginSubmit = () => {
  doLogin(
    loginParam.value,
    ({ data }) => {
      console.log(data);
      closeModal();
    },
    (error) => {
      loginParam.value.id = "";
      loginParam.value.password = "";
      closeModal();
      Swal.fire({
        icon: "error",
        title: "로그인 실패",
        text: "다시 로그인해주세요!",
      });
    }
  );
};
</script>

<template>
  <div id="modalWrap" v-show="isShownLoginModal">
    <div id="modalContent">
      <div id="modalBody">
        <span id="closeBtn" @click="closeModal">&times;</span>
        <p class="fs-3">로그인</p>
        <form action="" method="post" id="loginForm">
          <div class="input-group mb-1" id="input-group">
            <span class="input-group-text">아이디</span>
            <input
              type="text"
              class="form-control"
              placeholder="아이디를 입력하세요"
              name="id"
              v-model="loginParam.id"
            />
          </div>
          <input class="form-check-input" type="checkbox" name="saveId" value="checked" />
          아이디저장
          <div class="input-group mt-3" id="input-group">
            <span class="input-group-text">비밀번호</span>
            <input
              type="password"
              class="form-control"
              placeholder="비밀번호를 입력하세요"
              name="password"
              v-model="loginParam.password"
            />
          </div>
        </form>
        <div id="footer">
          <button type="button" class="btn me-1 btn">
            <a style="text-decoration: none" @click="openFindIdModal">아이디찾기</a>
          </button>
          <button type="button" class="btn me-5 btn">
            <a style="text-decoration: none" @click="openFindPwModal">비밀번호찾기</a>
          </button>
          <button type="button" @click="loginSubmit" class="btn ms-5 btn-secondary">LOGIN</button>
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
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

#modalBody {
  width: 500px;
  height: 300px;
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
  margin-top: 30px;
}
</style>
