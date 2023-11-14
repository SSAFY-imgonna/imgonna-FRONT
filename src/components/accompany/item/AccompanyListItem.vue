<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const { accompany } = defineProps({ accompany: Object });

if (accompany.fileInfos && accompany.fileInfos.length > 0) {
  const file = accompany.fileInfos[0];
}

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
        <img src="`/${file.saveFolder}/${file.saveFile}`" class="card-img-top" alt="..." />
      </span>
      <div class="card-body">
        <div class="card-text">
          <b>{{ accompany.title }}</b>
        </div>
        <div class="d-flex align-items-center my-2">
          <i class="bi bi-geo-alt-fill me-2"></i>{{ accompany.addr }}
        </div>
        <div class="d-flex align-items-center my-2">
          <i class="bi bi-calendar2-week me-2"></i>{{ accompany.joinTime }}
        </div>
        <div class="d-flex align-items-center my-2">
          <i class="bi bi-people-fill me-2"></i>
          {{ accompany.currentNum }} / {{ accompany.limitNum }}명
          <i class="bi bi-eye-fill me-1"></i>
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
            <!-- session의 Id와 일치한다면 -->
            <span class="text-danger me-2"><b>내가 쓴 글</b></span>
            <span class="text-body-secondary">
              <!-- 눈깔 안보임;; -->
              <i class="fa-solid fa-eye"></i> {{ accompany.id }}
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
  width: 100%;
  height: 225px;
}
</style>
