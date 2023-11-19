<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { ref } from "vue";
import { SmileOutlined } from "@ant-design/icons-vue";
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);
const imageUrl = new URL("@/assets/img/springboot/upload/", import.meta.url).href;
console.log(member.value);
</script>

<template>
  <div v-if="member != null" class="row d-flex justify-content-center align-items-center">
    <div class="col col-lg-6 mb-4 mb-lg-0">
      <h6 id="greeting" class="mt-5">
        <SmileOutlined />
        다시 만나뵙게 되어 반갑습니다 {{ member.nickname }}님!
      </h6>
      <div class="line-dec"></div>

      <div class="card mb-3" style="border-radius: 0.5rem">
        <div class="row g-0">
          <div
            class="col-md-4 gradient-custom text-center text-white"
            style="border-top-left-radius: 0.5rem; border-bottom-left-radius: 0.5rem"
          >
            <i v-if="!member.photo" style="font-size: 120px" class="bi bi-person-circle"></i>

            <img
              v-else
              :src="`${imageUrl}/${member.photo}`"
              alt=""
              class="img-fluid my-5"
              style="width: 80px"
            />

            <h5>{{ member.nickname }}</h5>
            <p>{{ member.introduction }}</p>
            <i class="far fa-edit mb-5"></i>
          </div>
          <div class="col-md-8">
            <div class="card-body p-4">
              <h6>Information</h6>
              <hr class="mt-0 mb-4" />
              <div class="row pt-1">
                <div class="col-6 mb-3">
                  <h6>Email</h6>
                  <p class="text-muted">{{ member.email }}</p>
                </div>
                <div class="col-6 mb-3">
                  <h6>Phone</h6>
                  <p class="text-muted">{{ member.phone }}</p>
                </div>
              </div>
              <h6>Projects</h6>
              <hr class="mt-0 mb-4" />
              <div class="row pt-1">
                <div class="col-6 mb-3">
                  <h6>Recent</h6>
                  <p class="text-muted">Lorem ipsum</p>
                </div>
                <div class="col-6 mb-3">
                  <h6>Most Viewed</h6>
                  <p class="text-muted">Dolor sit amet</p>
                </div>
              </div>
              <div class="d-flex justify-content-start">
                <a href="#!"><i class="fab fa-facebook-f fa-lg me-3"></i></a>
                <a href="#!"><i class="fab fa-twitter fa-lg me-3"></i></a>
                <a href="#!"><i class="fab fa-instagram fa-lg"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#greeting {
  background-color: white;
  display: inline-block;
  border: 5px solid white;
  color: green;
}
</style>
