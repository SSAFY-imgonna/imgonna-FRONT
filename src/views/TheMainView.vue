<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { ref } from "vue";
import { SmileOutlined } from "@ant-design/icons-vue";
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);
</script>

<template>
  <section class="banner" id="top">
    <div class="container-fluid">
      <div class="row">
        <div class="left-banner-content">
          <div class="text-content">
            <h6 id="greeting" v-if="member != null">
              <SmileOutlined />
              {{ userInfo.nickname }}({{ userInfo.id }})님 반갑습니다!
            </h6>
            <div class="line-dec"></div>
            <h1 id="indexTitle">Enjoy Trip</h1>
            <div class="white-border-button">
              <a href="#" class="scroll-link" data-id="best-offer-section">자세히 보기</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
#greeting {
  background-color: white;
  display: inline-block;
  border: 5px solid white;
  color: green;
}
</style>
