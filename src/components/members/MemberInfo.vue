<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
const memberStore = useMemberStore();
const { isLogin, userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);
</script>

<template>
  <section id="book-a-table" class="book-a-table">
    <div class="container" data-aos="fade-up">
      <div class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
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

        <div class="d-flex justify-content-center align-items-center">
          <!-- <div class="order-md-1 mt-3"> -->
          <div class="row">
            <div class="input-group col-6 col-lg-6 col-md-12">
              <span class="input-group-text">아이디</span>
              <input type="text" class="form-control" :value="member.id" readonly />
            </div>

            <div class="input-group col-6 col-lg-6 col-md-12">
              <span class="input-group-text">이름</span>
              <input type="text" class="form-control" :value="member.name" readonly />
            </div>
          </div>

          <div class="row gy-12">
            <div class="input-group col-lg-6 col-md-12">
              <span class="input-group-text">닉네임</span>
              <input type="text" class="form-control" :value="member.nickname" readonly />
            </div>
            <div class="input-group col-lg-6 col-md-12">
              <span class="input-group-text">mbti</span>
              <input type="text" class="form-control" :value="member.mbti" readonly />
            </div>
          </div>

          <div class="row gy-12">
            <div class="input-group col-lg-6 col-md-12">
              <span class="input-group-text">연락처</span>
              <input type="text" class="form-control" :value="member.phone" readonly />
            </div>

            <div class="input-group col-lg-6 col-md-12">
              <span class="input-group-text">이메일</span>
              <input type="text" class="form-control" :value="member.email" readonly />
            </div>
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">소개글</span>
            <textarea class="form-control" type="text" rows="3" cols="30">{{
              member.introduction
            }}</textarea>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </section>
</template>

<style scoped></style>
