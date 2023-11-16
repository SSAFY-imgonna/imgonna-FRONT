<script setup>
import { ref } from "vue";
import MemberLogin from "../members/modal/MemberLogin.vue";
import MemberSignUp from "../members/modal/MemberSignUp.vue";
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
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3"
  >
    <div class="container-fluid px-5">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbars"
        aria-controls="navbars"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="col-md-3 mb-2 mb-md-0">
        <a href="#" class="d-inline-flex link-body-emphasis text-decoration-none">
          <router-link :to="{ name: 'main' }" class="navbar-brand">
            <font-awesome-icon icon="fa-solid fa-plane-departure" />
            <span id="indexTitle" class="fw-bolder"> EnjoyTrip</span>
          </router-link>
        </a>
      </div>

      <div class="collapse navbar-collapse justify-content-md-center" id="navbars">
        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <router-link class="nav-link px-2 link-body-emphasis" :to="{ name: 'attraction' }"
              >지역별여행지</router-link
            >
          </li>
          <li><a class="nav-link px-2 link-body-emphasis" href="#">나의여행계획</a></li>
          <li><a class="nav-link px-2 link-body-emphasis" href="#">핫플자랑하기</a></li>
          <li><a class="nav-link px-2 link-body-emphasis" href="#">여행정보공유</a></li>
          <li><a class="nav-link px-2 link-body-emphasis" href="/accompany">동행구하기</a></li>
          <li>
            <router-link class="nav-link px-2 link-body-emphasis" :to="{ name: 'diary' }">
              여행일기
            </router-link>
          </li>
          <li>
            <router-link class="nav-link px-2 link-body-emphasis" :to="{ name: 'qna' }"
              >QnA</router-link
            >
          </li>
        </ul>

        <div class="col-md-3 text-end align-items-center">
          <div v-if="isLogin" class="dropdown">
            <a
              href="#"
              class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle ms-5"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src="/no_image.png" alt="" width="32" height="32" class="rounded-circle me-2" />
              <strong v-if="isLogin">{{ userInfo.nickname }}님</strong>
            </a>
            <ul class="dropdown-menu text-small shadow">
              <li>
                <a class="dropdown-item" href="#"
                  ><router-link :to="{ name: 'mypage' }" class="nav-link"
                    >마이페이지</router-link
                  ></a
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#"
                  ><a class="nav-link" href="#" @click="doLogout">로그아웃</a></a
                >
              </li>
            </ul>
          </div>
          <div v-else>
            <button class="btn btn-outline-secondary me-2" @click="getLoginModal">로그인</button>
            <button class="btn btn-secondary" @click="getSignUpModal">회원가입</button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <MemberLogin :is-shown-login-modal="isShownLoginModal" @close-modal="getLoginModal" />
  <MemberSignUp :is-shown-sign-up-modal="isShownSignUpModal" @close-modal="getSignUpModal" />
</template>

<style scoped>
@import "../css/indexstyles.css";
.text-small {
  font-size: 85%;
}

.dropdown-toggle:not(:focus) {
  outline: 0;
}
</style>
