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
  <div class="row">
    <div class="col-lg-4">
      <div class="card mb-4">
        <div class="card-body text-center">
          <!-- <img
            v-if="!member.photo"
            src="/no_image.png"
            style="width: 150px"
            class="rounded-circle img-fluid me-2"
          /> -->
          <i v-if="!userInfo.photo" style="font-size: 120px" class="bi bi-person-circle"></i>

          <img
            v-else
            :src="`${imageUrl}/${member.photo}`"
            alt=""
            style="width: 150px"
            class="rounded-circle img-fluid me-2"
          />
          <h5 class="my-3">{{ member.name }}({{ member.nickname }})</h5>
          <p class="text-muted mb-5">{{ member.introduction }}</p>
          <!-- <p class="text-muted mb-4">Bay Area, San Francisco, CA</p> -->
          <div class="d-flex justify-content-center mb-2">
            <button class="btn btn-danger" @click="getDeleteModal">회원 탈퇴</button>
            <button type="button" class="btn btn-outline-primary ms-1">Message</button>
          </div>
        </div>
      </div>
      <div class="card mb-4 mb-lg-0">
        <div class="card-body p-0">
          <ul class="list-group list-group-flush rounded-3">
            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
              <i class="fas fa-globe fa-lg text-warning"></i>
              <p class="mb-0">https://mdbootstrap.com</p>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
              <i class="fab fa-github fa-lg" style="color: #333333"></i>
              <p class="mb-0">mdbootstrap</p>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
              <i class="fab fa-twitter fa-lg" style="color: #55acee"></i>
              <p class="mb-0">@mdbootstrap</p>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
              <i class="fab fa-instagram fa-lg" style="color: #ac2bac"></i>
              <p class="mb-0">mdbootstrap</p>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center p-3">
              <i class="fab fa-facebook-f fa-lg" style="color: #3b5998"></i>
              <p class="mb-0">mdbootstrap</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">아이디</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ member.id }}</p>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">이메일</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ member.email }}</p>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">전화번호</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ member.phone }}</p>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">MBTI</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ member.mbti }}</p>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">가입일</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ member.joinDate.substr(0, 10) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4 mb-md-0">
            <div class="card-body">
              <p class="mb-4">
                <span class="text-primary font-italic me-1">assigment</span> Project Status
              </p>
              <p class="mb-1" style="font-size: 0.77rem">Web Design</p>
              <div class="progress rounded" style="height: 5px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 80%"
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p class="mt-4 mb-1" style="font-size: 0.77rem">Website Markup</p>
              <div class="progress rounded" style="height: 5px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 72%"
                  aria-valuenow="72"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p class="mt-4 mb-1" style="font-size: 0.77rem">One Page</p>
              <div class="progress rounded" style="height: 5px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 89%"
                  aria-valuenow="89"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p class="mt-4 mb-1" style="font-size: 0.77rem">Mobile Template</p>
              <div class="progress rounded" style="height: 5px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 55%"
                  aria-valuenow="55"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p class="mt-4 mb-1" style="font-size: 0.77rem">Backend API</p>
              <div class="progress rounded mb-2" style="height: 5px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 66%"
                  aria-valuenow="66"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4 mb-md-0">
            <div class="card-body">
              <p class="mb-4">
                <span class="text-primary font-italic me-1">assigment</span> Project Status
              </p>
              <p class="mb-1" style="font-size: 0.77rem">Web Design</p>
              <div class="progress rounded" style="height: 5px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 80%"
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p class="mt-4 mb-1" style="font-size: 0.77rem">Website Markup</p>
              <div class="progress rounded" style="height: 5px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 72%"
                  aria-valuenow="72"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p class="mt-4 mb-1" style="font-size: 0.77rem">One Page</p>
              <div class="progress rounded" style="height: 5px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 89%"
                  aria-valuenow="89"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p class="mt-4 mb-1" style="font-size: 0.77rem">Mobile Template</p>
              <div class="progress rounded" style="height: 5px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 55%"
                  aria-valuenow="55"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p class="mt-4 mb-1" style="font-size: 0.77rem">Backend API</p>
              <div class="progress rounded mb-2" style="height: 5px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 66%"
                  aria-valuenow="66"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MemberDelete :is-shown-delete-modal="isShownDeleteModal" @close-modal="getDeleteModal" />
</template>

<style scoped>
.progress,
.progress-stacked {
  --bs-progress-height: 1rem;
  --bs-progress-font-size: 0.75rem;
  --bs-progress-bg: var(--bs-secondary-bg);
  --bs-progress-border-radius: var(--bs-border-radius);
  --bs-progress-box-shadow: var(--bs-box-shadow-inset);
  --bs-progress-bar-color: #fff;
  --bs-progress-bar-bg: #74b359;
  --bs-progress-bar-transition: width 0.6s ease;
  display: flex;
  height: var(--bs-progress-height);
  overflow: hidden;
  font-size: var(--bs-progress-font-size);
  background-color: var(--bs-progress-bg);
  border-radius: var(--bs-progress-border-radius);
}

#container {
  text-align: center;
  margin-block: 10px;
}
.input-row {
  width: 60%;
  margin-block: 10px;
}
</style>
