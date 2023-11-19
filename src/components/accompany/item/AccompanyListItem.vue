<script setup>
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const imageUrl = new URL("@/assets/img/springboot/upload/", import.meta.url).href;

const router = useRouter();

const { accompany } = defineProps({ accompany: Object });

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);

const moveView = () => {
  router.push({ name: "accompany-view", params: { accompanyNo: accompany.accompanyNo } });
};
</script>

<template>
  <div class="col">
    <div class="card shadow-sm">
      <!-- 저장된 이미지가 없는 경우 -->
      <span v-if="!accompany.fileInfos || accompany.fileInfos.length === 0">
        <img src="/no_image.png" class="card-img-top" alt="..." />
      </span>
      <!-- 저장된 이미지가 있는 경우 -->
      <span v-else>
        <img
          class="card-img-top"
          alt="place Image"
          :src="`${imageUrl}/${accompany.fileInfos[0].saveFolder}/${accompany.fileInfos[0].saveFile}`"
        />
      </span>
      <div class="card-body">
        <div class="card-text">
          <b>{{ accompany.title }}</b>
        </div>
        <div class="d-flex align-items-center my-2">
          <font-awesome-icon icon="fa-solid fa-location-dot" class="me-2" />
          {{ accompany.addr }}
        </div>
        <div class="d-flex align-items-center my-2">
          <font-awesome-icon icon="fa-solid fa-calendar-days" class="me-2" />
          {{ accompany.joinTime }}
        </div>
        <div class="d-flex align-items-center my-2">
          <font-awesome-icon icon="fa-solid fa-user-group" class="me-2" />
          {{ accompany.currentNum }} / {{ accompany.limitNum }}명
          <font-awesome-icon icon="fa-solid fa-eye" class="mx-2" />
          {{ accompany.hit }}
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary showDetail"
              @click="moveView"
            >
              자세히 보기
            </button>
          </div>
          <div>
            <!-- 작성자의 Id와 일치한다면 -->
            <span v-if="member && member.id == accompany.id" class="text-danger me-2"
              ><b>내가 쓴 글</b></span
            >
            <span class="text-body-secondary">
              <font-awesome-icon icon="fa-solid fa-circle-user" />
              {{ accompany.id }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 목록 부분 */
.card-img-top {
  width: auto;
  height: auto;
  width: 100%;
  height: 225px;
}
</style>
