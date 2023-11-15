<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { vShow } from "vue";
const memberStore = useMemberStore();
const { isLogin, userInfo } = storeToRefs(memberStore);
</script>

<template>
  <section class="banner" id="top">
    <div class="container-fluid">
      <div class="row">
        <div class="left-banner-content">
          <div class="text-content">
            <!-- <c:if test="${not empty sessionScope.memberDto}">
                <h6>
                  ${sessionScope.memberDto.nickname}(${sessionScope.memberDto.id})님 반갑습니다!
                </h6>
              </c:if>
              <c:if test="${empty sessionScope.memberDto}">
                <h6>There you go</h6>
              </c:if> -->
            <h6 id="greeting" v-show="isLogin">
              {{ userInfo.nickname }}({{ userInfo.id }})님 반갑습니다!
            </h6>
            <div class="line-dec"></div>
            <h1 id="indexTitle">Enjoy Trip</h1>
            <div class="white-border-button">
              <a href="#" class="scroll-link" data-id="best-offer-section">자세히 보기</a>
            </div>
          </div>
        </div>
        <!-- <div class="col-md-4">
          <div class="right-banner-content">
            <div class="logo">
              <a href="/"> </a>
            </div>
            <h3>문의하기</h3>
            <span>이름과 연락처를 남겨주세요</span>
            <div class="line-dec"></div>
            <form>
              <input type="text" class="form-control" placeholder="이름" />
              <br />
              <input type="tel" class="form-control" placeholder="전화번호" /> <br />
              <input type="checkbox" class="form-check-input mt-0" /> <span> 정보제공동의함 </span>
              <br />
              <input type="submit" class="btn btn-outline-secondary mt-5" value="보내기" />
            </form>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

<style>
/* @import "../assets/css/indexstyles.css"; */
#greeting {
  background-color: white;
  display: inline-block;
  border: 5px solid white;
  color: green;
}
</style>
