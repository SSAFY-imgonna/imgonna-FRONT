<script setup>
import { ref } from "vue";
import { userFindId } from "@/api/member";

import Swal from "sweetalert2";

const emit = defineEmits(["finished"]);

const showWarning = (text) => {
  Swal.fire({
    icon: "warning",
    text: text,
  });
};
const param = ref({ email: "", name: "" });

const findId = async () => {
  if (!param.value.email) {
    showWarning("이메일을 입력해주세요!");
  } else if (!param.value.name) {
    showWarning("이름을 입력해주세요!");
  } else {
    userFindId(
      param.value,
      ({ data }) => {
        console.log(data);
        Swal.fire({
          icon: "info",
          title: "아이디 찾기 결과",
          text: data,
        });
        emit("finished");
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "아이디 찾기 결과",
          text: "일치하는 정보가 없습니다. 다시 시도해주세요!",
        });
        emit("finished");
      }
    );
  }
  // router.push("/");s
};
</script>

<template>
  <p class="fs-3 mb-4">아이디 찾기</p>
  <form action="" method="post" id="loginForm">
    <div class="input-group mb-1" id="input-group">
      <span class="input-group-text">이메일</span>
      <input
        type="text"
        class="form-control"
        placeholder="이메일을 입력하세요"
        v-model="param.email"
      />
    </div>
    <div class="input-group mt-3" id="input-group">
      <span class="input-group-text">이름</span>
      <input
        type="text"
        class="form-control"
        placeholder="이름을 입력하세요"
        v-model="param.name"
      />
    </div>
  </form>
  <div id="footer">
    <button type="button" @click="findId" class="btn ms-5 btn-secondary">찾기</button>
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
