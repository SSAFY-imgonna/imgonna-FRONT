<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { doModifyPassword } from "@/api/member";
import Swal from "sweetalert2";
const memberStore = useMemberStore();
const { userLogout, userInfo } = storeToRefs(memberStore);

const props = defineProps({
  oldPw: String,
  id: String,
});

const emit = defineEmits(["finished"]);

const newPasswordConfirm = ref("");

const modifyParams = ref({
  oldPassword: "",
  newPassword: "",
});

const showWarning = (text) => {
  Swal.fire({
    scrollbarPadding: false,
    // optional
    heightAuto: false,
    icon: "warning",
    text: text,
  });
};

const modifyPassword = () => {
  if (!modifyParams.value.newPassword) {
    showWarning("변경할 비밀번호는 필수 입력값입니다!");
  } else if (!newPasswordConfirm.value) {
    showWarning("변경할 비밀번호를 재입력해주세요!");
  } else if (modifyParams.value.newPassword != newPasswordConfirm.value) {
    showWarning("변경할 비밀번호를 정확하게 입력해주세요!");
  } else {
    modifyParams.value.oldPassword = props.oldPw;
    doModifyPassword(
      props.id,
      modifyParams.value,
      ({ data }) => {
        console.log(data);
        Swal.fire({
          scrollbarPadding: false,
          // optional
          heightAuto: false,
          icon: "success",
          title: "비밀번호 재설정 성공",
          text: "다시 로그인 해주세요!",
        });
        emit("finished");
      },
      (error) => {
        Swal.fire({
          scrollbarPadding: false,
          // optional
          heightAuto: false,
          icon: "error",
          title: "비밀번호 재설정 실패",
          text: "다시 시도해주세요!",
        });
      }
    );
  }
};
</script>

<template>
  <div class="input-group mb-3">
    <form>
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
