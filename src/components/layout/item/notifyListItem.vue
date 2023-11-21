<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { updateNotify } from "@/api/notify";

const { notify } = defineProps({ notify: Object });

const router = useRouter();

const emit = defineEmits(["getNotifyAgain", "closeToggle"]);

const getNotifyAgain = () => {
  emit("getNotifyAgain");
};

const closeEvent = () => {
  emit("closeToggle");
};

function moveAccompany() {
  console.log("동행 페이지로 이동 : ", notify.pkNo);

  console.log("동행 페이지로 이동 : ", notify.tableName);
  closeEvent();
  // 동행 알림이라면
  if (notify.tableName == 1) {
    router.push({ name: "accompany-view", params: { accompanyNo: notify.pkNo } });
  }
}

const notifyNo = ref({
  notifyNo: notify.notifyNo,
});
function readEvent() {
  console.log("알림을 읽었음", notify);
  updateNotify(
    notifyNo.value,
    ({ data }) => {
      console.log(data);
      getNotifyAgain();
    },
    (error) => {
      console.log(error);
    }
  );
}
</script>

<template>
  <li class="notification-item" @click="moveAccompany">
    <i class="bi bi-bell text-warning"></i>
    <div>
      <span v-if="notify.tableName == 1">동행</span>
      <span>({{ notify.pkNo }}번 글)</span>
      <h4>{{ notify.send }}님이 {{ notify.content }}</h4>
      <span>{{ notify.createdTime }}</span>
      <button type="button" class="btn btn-dark btn-sm rounded-pill ms-2" @click.stop="readEvent">
        읽음
      </button>
    </div>
  </li>

  <li>
    <hr class="dropdown-divider" />
  </li>
</template>

<style scoped>
@import "@/assets/css/notify.css";
</style>
