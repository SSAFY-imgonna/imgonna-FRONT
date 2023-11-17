<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { doModifyPassword } from "@/api/member";
import Swal from "sweetalert2";
const memberStore = useMemberStore();
const { isLogin, isValidToken, userInfo } = storeToRefs(memberStore);

const newPasswordConfirm = ref("");

const modifyParams = ref({
  oldPassword: "",
  newPassword: "",
});

const showWarning = (text) => {
  Swal.fire({
    icon: "warning",
    text: text,
  });
};

const modifyPassword = () => {
  if (!modifyParams.value.oldPassword) {
    showWarning("기존 비밀번호는 필수 입력값입니다!");
  } else if (!modifyParams.value.newPassword) {
    showWarning("변경할 비밀번호는 필수 입력값입니다!");
  } else if (!newPasswordConfirm.value) {
    showWarning("변경할 비밀번호를 재입력해주세요!");
  } else if (modifyParams.value.newPassword != newPasswordConfirm.value) {
    showWarning("변경할 비밀번호를 정확하게 입력해주세요!");
  } else {
    doModifyPassword(
      userInfo.value.id,
      modifyParams.value,
      ({ data }) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "비밀번호 변경 성공",
          text: "다시 로그인 해주세요!",
        });
        isLogin.value = false;
        userInfo.value = null;
        isValidToken.value = false;
        location.href = "/";
      },
      (error) => {
        if (error.response.status == 400) {
          showWarning("기존 비밀번호를 정확하게 입력해주세요!");
        } else {
          Swal.fire({
            icon: "error",
            title: "비밀번호 변경 실패",
            text: "다시 시도해주세요!",
          });
        }
        console.log(error);
      }
    );
  }
};
</script>

<template>
  <div class="input-group mb-3">
    <form>
      <div class="input-group mb-3">
        <span class="input-group-text">기존 비밀번호</span>
        <input
          type="password"
          class="form-control"
          name="password"
          v-model="modifyParams.oldPassword"
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">변경할 비밀번호</span>
        <input
          type="password"
          class="form-control"
          name="password"
          v-model="modifyParams.newPassword"
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">변경할 비밀번호 재입력</span>
        <input type="password" class="form-control" name="password" v-model="newPasswordConfirm" />
      </div>
      <input type="button" class="btn btn-secondary" @click="modifyPassword" value="확인" />
    </form>
  </div>
</template>

<style scoped></style>
