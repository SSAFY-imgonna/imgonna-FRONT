<script setup>
const loginId = "";
const loginPwd = "";

defineProps({
  isModalOpen: Boolean,
});

// console.log(isModalOpen);
// const openModal = ()  => {
//   this.isModalOpen = true;
// }
// closeModal() {
//   this.isModalOpen = false;
// },
// loginSubmit() {
//   // 로그인 로직을 수행하거나 다른 작업을 수행할 수 있습니다.
//   console.log("Login submitted");
// },
// openFindIdModal() {
//   // 아이디 찾기 모달을 열기 위한 로직을 추가할 수 있습니다.
//   console.log("Open Find ID Modal");
// },
// openFindPwModal() {
//   // 비밀번호 찾기 모달을 열기 위한 로직을 추가할 수 있습니다.
//   console.log("Open Find Password Modal");
// }
</script>

<template>
  <div id="app">
    <div
      v-if="isModalOpen"
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fs-5">로그인</h2>
          </div>

          <div class="modal-body">
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
          </div>

          <div class="modal-footer">
            <button type="button" @click="loginSubmit" class="btn btn-outline-primary">
              로그인
            </button>
            <button type="button" class="btn btn-outline-warning">
              <a style="text-decoration: none" @click="openFindIdModal">아이디찾기</a>
            </button>
            <button type="button" class="btn btn-outline-warning">
              <a style="text-decoration: none" @click="openFindPwModal">비밀번호찾기</a>
            </button>
            <input
              type="button"
              class="btn btn-outline-secondary"
              value="닫기"
              data-bs-dismiss="modal"
              aria-label="close"
              @click="closeModal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
