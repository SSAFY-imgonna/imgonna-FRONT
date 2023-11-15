<script setup>
import { ref } from "vue";
import MemberLogin from "../members/MemberLogin.vue";
import MemberSignUp from "../members/MemberSignUp.vue";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import Swal from "sweetalert2";
const isShownLoginModal = ref(false);
const isShownSignUpModal = ref(false);
const memberStore = useMemberStore();
const { userLogout } = memberStore;
const { isLogin, userInfo } = storeToRefs(memberStore);

const getLoginModal = () => {
  isShownLoginModal.value = !isShownLoginModal.value;
};

const getSignUpModal = () => {
  isShownSignUpModal.value = !isShownSignUpModal.value;
};

const doLogout = async () => {
  await userLogout(userInfo.value.id);
};
// }
</script>

<template>
  <title>Enjoy Trip</title>
  <!-- Favicon-->
  <link rel="icon" type="image/x-icon" href="./assets/favicon.ico" />

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid px-5">
      <router-link :to="{ name: 'main' }" class="navbar-brand">
        <font-awesome-icon icon="fa-solid fa-plane-departure" />
        <span id="indexTitle" class="fw-bolder"> EnjoyTrip</span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- <ul class="navbar-nav ms-auto mb-2 mb-lg-0 nnav"> -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 nnav">
          <li class="nav-item">
            <router-link :to="{ name: 'attraction' }" class="nav-link">지역별여행지</router-link>
          </li>
          <li class="nav-item"><a class="nav-link" href="#">나의여행계획</a></li>
          <li class="nav-item"><a class="nav-link" href="#">핫플자랑하기</a></li>
          <li class="nav-item"><a class="nav-link" href="#">여행정보공유</a></li>
          <li class="nav-item"><a class="nav-link" href="/accompany/list">동행구하기</a></li>
          <li class="nav-item">
            <router-link :to="{ name: 'qna' }" class="nav-link">QnA</router-link>
          </li>
          <li class="nav-item" v-show="!isLogin">
            <a class="nav-link" href="#" @click="getLoginModal">로그인</a>
          </li>
          <li class="nav-item" v-show="!isLogin">
            <a class="nav-link" href="#" @click="getSignUpModal">회원가입</a>
          </li>
          <li class="nav-item" v-show="isLogin">
            <a class="nav-link" href="#" @click="doLogout">로그아웃</a>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0 nnav">
          <!-- <c:if test="${empty sessionScope.memberDto}">
            <li class="nav-item" id="func1">
              <a
                class="nav-link"
                id="register"
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
                >회원가입</a
              >
            </li>
            <li class="nav-item" id="func2">
              <a class="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal">로그인</a>
            </li>
          </c:if>

          <c:if test="${not empty sessionScope.memberDto}">
            <li class="nav-item">
              <a class="nav-link" href="/members/mypage">마이페이지</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="/members/logout">로그아웃</a></li>
          </c:if> -->
        </ul>
      </div>
    </div>
  </nav>
  <MemberLogin :is-shown-login-modal="isShownLoginModal" @close-modal="getLoginModal" />
  <MemberSignUp :is-shown-sign-up-modal="isShownSignUpModal" @close-modal="getSignUpModal" />
</template>

<style scoped>
@import "../css/indexstyles.css";
</style>
