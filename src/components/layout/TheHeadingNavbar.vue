<script setup>
import { ref, watch } from "vue";
import MemberLogin from "../members/modal/MemberLogin.vue";
import MemberSignUp from "../members/modal/MemberSignUp.vue";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import "../js/main.js";
import { UserOutlined } from "@ant-design/icons-vue";
import notifyItem from "./item/notifyItem.vue";

const props = defineProps({ notifyAgain: Boolean });

watch(
  () => props.notifyAgain,
  () => {
    console.log("nav에서 감시 값바뀜");
  }
);

const imageUrl = new URL("@/assets/img/springboot/upload/", import.meta.url).href;

const isShownSignUpModal = ref(false);
const memberStore = useMemberStore();
const { userLogout } = memberStore;
const { isLogin, userInfo, isShownLoginModal } = storeToRefs(memberStore);

const member = ref(userInfo);

const getLoginModal = () => {
  console.log("isShownLoginModal", isShownLoginModal.value);
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
  <!-- ======= Header ======= -->
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="container d-flex align-items-center">
      <!-- Uncomment the line below if you also wish to use an image logo -->
      <!-- <img src="assets/img/logo.png" alt=""> -->

      <router-link
        :to="{ name: 'main' }"
        class="logo d-flex align-items-center me-auto me-lg-0 text-decoration-none"
      >
        <img src="/img/imgonna_logo.gif" style="width: 40px" class="img-fluid me-2" />
        <!-- <font-awesome-icon icon="fa-solid fa-plane-departure" class="me-2" /> -->
        <!-- <h1>i<span>'</span>mgonna</h1> -->
        <h1 style="font-family: 'Raleway', sans-serif">i<span>'</span>mgonna</h1>
      </router-link>

      <nav id="navbar" class="navbar">
        <ul>
          <li>
            <router-link class="text-decoration-none" :to="{ name: 'attraction' }"
              >여행지도</router-link
            >
          </li>
          <li>
            <router-link class="text-decoration-none" :to="{ name: 'course' }"
              >여행코스</router-link
            >
          </li>
          <li>
            <router-link class="text-decoration-none" :to="{ name: 'accompany' }"
              >동행구하기</router-link
            >
          </li>
          <li>
            <router-link class="text-decoration-none" :to="{ name: 'plan' }"
              >여행플래너</router-link
            >
          </li>
          <li>
            <router-link class="text-decoration-none" :to="{ name: 'diary' }">여행일기</router-link>
          </li>
          <li>
            <router-link class="text-decoration-none" :to="{ name: 'qna' }">커뮤니티</router-link>
          </li>
          <!-- <li>
            <router-link class="text-decoration-none" :to="{ name: 'plan' }"
              >여행계획상세</router-link
            >
          </li> -->
        </ul>
      </nav>
      <!-- .navbar -->

      <notifyItem v-if="isLogin" style="margin-left: 100px" :notifyAgain="notifyAgain"></notifyItem>
      <div class="text-end align-item-center">
        <div v-if="isLogin" class="dropdown">
          <a
            href="#"
            class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i v-if="!member.photo" class="bi bi-person-circle me-2"></i>

            <img
              v-else
              :src="`${imageUrl}/${member.photo}`"
              alt=""
              width="30"
              class="rounded-circle img-fluid me-2"
            />
            <strong v-if="isLogin && member != null">{{ member.nickname }}님</strong>
          </a>
          <ul class="dropdown-menu text-small shadow">
            <li>
              <a class="dropdown-item" href="#"
                ><router-link :to="{ name: 'mypage' }" class="nav-link">마이페이지</router-link></a
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
          <button class="btn btn-outline-book-a-table me-2" @click="getLoginModal">로그인</button>
          <button class="btn btn-book-a-table" @click="getSignUpModal">회원가입</button>
        </div>
      </div>

      <!-- <a class="btn-book-a-table" href="#book-a-table">Book a Table</a> -->
      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
    </div>
  </header>
  <MemberLogin />
  <MemberSignUp :is-shown-sign-up-modal="isShownSignUpModal" @close-modal="getSignUpModal" />
</template>

<style>
@import "../css/indexstyles.css";
* {
  font-family: "Nanum Gothic", sans-serif !important;
}
.text-small {
  font-size: 85%;
}

.dropdown-toggle:not(:focus) {
  outline: 0;
}

/* 여기서부터 navbar css 추가한 내용 */
.d-flex {
  /* justify-content: center; */
}

@media (min-width: 992px) {
  a.logo {
    margin-right: 72px !important;
  }
}
</style>
