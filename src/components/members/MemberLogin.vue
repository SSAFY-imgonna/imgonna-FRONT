<script setup>
const loginId = "";
const loginPwd = "";

defineProps({
  isShownLoginModal: Boolean,
});

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};
</script>

<template>
  <div id="modalWrap" v-show="isShownLoginModal">
    <div id="modalContent">
      <div id="modalBody">
        <span id="closeBtn" @click="closeModal">&times;</span>
        <h2 class="fs-5">로그인</h2>
        <form action="" method="post" id="loginForm">
          <div class="input-group mb-1" id="input-group">
            <span class="input-group-text">아이디</span>
            <input
              type="text"
              class="form-control"
              id="loginId"
              placeholder="아이디를 입력하세요"
              name="loginId"
              v-model="loginId"
            />
          </div>
          <input type="checkbox" name="saveId" value="checked" /> 아이디저장
          <div class="input-group mt-3" id="input-group">
            <span class="input-group-text">비밀번호</span>
            <input
              type="password"
              class="form-control"
              id="loginPw"
              placeholder="비밀번호를 입력하세요"
              name="loginPwd"
              v-model="loginPwd"
            />
          </div>
        </form>
        <button type="button" @click="loginSubmit" class="btn btn-outline-primary">로그인</button>
        <button type="button" class="btn btn-outline-warning">
          <a style="text-decoration: none" @click="openFindIdModal">아이디찾기</a>
        </button>
        <button type="button" class="btn btn-outline-warning">
          <a style="text-decoration: none" @click="openFindPwModal">비밀번호찾기</a>
        </button>
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
}

#closeBtn {
  float: right;
  font-weight: bold;
  color: #777;
  font-size: 25px;
  cursor: pointer;
}
</style>
