<script setup>
const emit = defineEmits(["getNotifyAgain"]);

const getNotifyAgain = () => {
  console.log("MyPageView에서 수신");
  emit("getNotifyAgain");
};
</script>

<template>
  <section id="menu" class="menu">
    <section id="book-a-table" class="book-a-table">
      <div class="container py-2">
        <div class="row">
          <div class="col">
            <nav aria-label="breadcrumb" class="bg-light rounded-3 p-3 mb-4">
              <ol class="breadcrumb mb-0">
                <li>
                  <router-link class="nav-link link-body-emphasis" :to="{ name: 'member-info' }"
                    >내 정보 조회</router-link
                  >
                </li>
                <li>
                  <router-link class="nav-link link-body-emphasis" :to="{ name: 'member-modify' }"
                    >내 정보 수정</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="nav-link link-body-emphasis"
                    :to="{ name: 'member-modify-pw' }"
                    >비밀번호 변경</router-link
                  >
                </li>
                <li>
                  <router-link class="nav-link link-body-emphasis" :to="{ name: 'member-notify' }"
                    >내 알림 조회</router-link
                  >
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div>
          <RouterView @getNotifyAgain="getNotifyAgain"></RouterView>
        </div>
      </div>
    </section>
  </section>
</template>

<style>
@import "../components/layout/assets/css/indexstyles.css";
section {
  overflow: hidden;
  padding: 10px 0;
}
</style>
