<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();
const { isLogin, userInfo } = storeToRefs(memberStore);
</script>

<template>
  <div class="container">
    <div class="text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        fill="currentColor"
        class="bi bi-person-circle"
        viewBox="0 0 16 16"
      >
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path
          fill-rule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
        />
      </svg>
      <h2 class="m-3">내 정보 조회</h2>

      <div class="d-flex justify-content-center align-items-center">
        <div class="order-md-1 mt-3">
          <input type="hidden" name="action" value="modify" />
          <div class="form-floating mb-3">
            <input type="text" class="form-control" :value="userInfo.id" readonly />
            <label for="id">아이디</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" class="form-control" :value="userInfo.name" readonly />
            <label for="name">이름</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" class="form-control" :value="userInfo.nickname" readonly />
            <label for="nickname">닉네임</label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" :value="userInfo.mbti" readonly />
            <label for="mbti">mbti</label>
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">연락처</span>
            <input type="text" class="form-control" :value="userInfo.phone" readonly />
          </div>

          <div class="input-group mb-3" id="input-group">
            <span class="input-group-text">이메일</span>
            <input type="text" class="form-control" :value="userInfo.email" readonly />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">소개글</span>
            <textarea class="form-control" type="text" rows="3" cols="30">{{
              userInfo.introduction
            }}</textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
