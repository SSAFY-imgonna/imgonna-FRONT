<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import MemberDelete from "./modal/MemberDelete.vue";
const imageUrl = new URL("@/assets/img/springboot/upload/", import.meta.url).href;

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);

const isShownDeleteModal = ref(false);

const getDeleteModal = () => {
  isShownDeleteModal.value = !isShownDeleteModal.value;
};
</script>

<template>
  <section id="book-a-table" class="book-a-table">
    <div class="container" data-aos="fade-up">
      <div class="text-center">
        <!-- <svg
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
        </svg> -->

        <div class="text-align-center">
          <span v-if="!member.photo">
            <img src="/no_image.png" width="100" height="100" class="rounded-circle me-2" />
          </span>
          <!-- 저장된 이미지가 있는 경우 -->
          <span v-else>
            <img
              :src="`${imageUrl}/${member.photo}`"
              alt=""
              width="100"
              height="100"
              class="rounded-circle me-2"
            />
          </span>
          <div class="order-md-1 mt-3">
            <div class="input-row">
              <div class="input-group col-6 col-lg-6 col-md-12">
                <span class="input-group-text">아이디</span>
                <input type="text" class="form-control" :value="member.id" readonly />
              </div>

              <div class="input-group col-6 col-lg-6 col-md-12">
                <span class="input-group-text">이름</span>
                <input type="text" class="form-control" :value="member.name" readonly />
              </div>

              <div class="input-group col-6 col-lg-6 col-md-12">
                <span class="input-group-text">닉네임</span>
                <input type="text" class="form-control" :value="member.nickname" readonly />
              </div>
              <div class="input-group col-6 col-lg-6 col-md-12">
                <span class="input-group-text">mbti</span>
                <input type="text" class="form-control" :value="member.mbti" readonly />
              </div>

              <div class="input-group col-6 col-lg-6 col-md-12">
                <span class="input-group-text">연락처</span>
                <input type="text" class="form-control" :value="member.phone" readonly />
              </div>

              <div class="input-group col-lg-6 col-md-12">
                <span class="input-group-text">이메일</span>
                <input type="text" class="form-control" :value="member.email" readonly />
              </div>
            </div>

            <div class="input-group mb-3 input-row">
              <span class="input-group-text">소개글</span>
              <textarea class="form-control" type="text" rows="3" cols="30">{{
                member.introduction
              }}</textarea>
            </div>

            <button class="btn btn-danger" @click="getDeleteModal">회원 탈퇴</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <MemberDelete :is-shown-delete-modal="isShownDeleteModal" @close-modal="getDeleteModal" />
</template>

<style scoped>
#container {
  text-align: center;
  margin-block: 10px;
}
.input-row {
  width: 60%;
  margin-block: 10px;
}
</style>
