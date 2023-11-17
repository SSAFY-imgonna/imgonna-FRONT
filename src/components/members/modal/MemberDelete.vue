<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { doDelete } from "@/api/member";

import Swal from "sweetalert2";

defineProps({
  isShownDeleteModal: Boolean,
});

const memberStore = useMemberStore();

const { userInfo, isLogin, isValidToken } = storeToRefs(memberStore);
const { userLogout } = memberStore;

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  deleteParam.value.password = "";
  emit("closeModal");
};

const showWarning = (text) => {
  Swal.fire({
    icon: "warning",
    text: text,
  });
};
const deleteParam = ref({ password: "" });

const deleteSubmit = () => {
  if (!deleteParam.value.password) {
    showWarning("비밀번호를 입력해주세요!");
  } else {
    console.log(deleteParam.value);
    doDelete(
      userInfo.value.id,
      deleteParam.value,
      ({ data }) => {
        isLogin.value = false;
        userInfo.value = null;
        isValidToken.value = false;
        console.log(data);
        Swal.fire({
          icon: "info",
          title: "회원 탈퇴",
          text: "정상처리 되었습니다. 그동안 이용해주셔서 감사합니다.",
        });
        closeModal();
        location.href = "/";
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "회원 탈퇴",
          text: "회원 탈퇴가 정상적으로 처리되지 않았습니다. 다시 시도해주세요!",
        });
        closeModal();
      }
    );
  }
  // router.push("/");s
};
</script>

<template>
  <div id="modalWrap" v-show="isShownDeleteModal">
    <div id="modalContent">
      <div id="modalBody">
        <span id="closeBtn" @click="closeModal">&times;</span>
        <p class="fs-3 mb-4">회원 탈퇴</p>
        <form>
          <p>비밀번호를 입력해주세요.</p>
          <div class="input-group mt-3">
            <input
              type="password"
              class="form-control"
              placeholder="비밀번호를 입력하세요"
              name="password"
              v-model="deleteParam.password"
            />
          </div>
        </form>
        <div id="footer">
          <input type="button" @click="deleteSubmit" class="btn btn-secondary" value="탈퇴" />
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
