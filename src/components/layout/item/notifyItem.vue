<script setup>
import { ref, onMounted } from "vue";
// import { getNotifyCount, getNotifyList, updateNotify, deleteNotify } from "@/api/notify";
import { getNotifyCount, getNotifyList, updateNotifyAll } from "@/api/notify";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import NotifyListItem from "./notifyListItem.vue";

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);

const param = ref({
  id: "",
});

const notifyCount = ref(0);
onMounted(() => {
  if (member.value != null) {
    param.value.id = member.value.id;
    console.log("NotifyCount 실행한다");
    NotifyCount();
    // NotifyList();
  }
});

const notifyList = ref([]);
const NotifyCount = () => {
  console.log(param.value);
  getNotifyCount(
    param.value,
    ({ data }) => {
      console.log(data);
      notifyCount.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const NotifyList = () => {
  console.log(param.value);
  getNotifyList(
    param.value,
    ({ data }) => {
      console.log(data);
      notifyList.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const getNotifyAgain = () => {
  console.log("다시 얻어옴");
  NotifyCount();
  NotifyList();
};

const readAll = () => {
  console.log("모두읽음");
  updateNotifyAll(
    param.value,
    ({ data }) => {
      console.log("성공적으로 모두읽음");
      getNotifyCount();
      getNotifyAgain();
    },
    (error) => {
      console.log(error);
    }
  );
};
</script>

<template>
  <span class="header-nav">
    <li class="nav-item dropdown">
      <a
        class="nav-link nav-icon"
        href="#"
        data-bs-toggle="dropdown"
        @click="NotifyList"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        <i class="bi bi-bell"></i>
        <span class="badge bg-success badge-number">{{ notifyCount }}</span> </a
      ><!-- End Notification Icon -->

      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
        <li class="dropdown-header">
          {{ notifyCount }}개의 새로운 알림이 있습니다.
          <a href="#"
            ><span class="badge rounded-pill bg-success p-2 ms-2" @click="readAll"
              >모두읽음</span
            ></a
          >
        </li>
        <li>
          <hr class="dropdown-divider" />
        </li>
        <NotifyListItem
          v-for="notify in notifyList"
          :key="notify.notifyNo"
          :notify="notify"
          @getNotifyAgain="getNotifyAgain"
        ></NotifyListItem>
        <li class="dropdown-footer">
          <a href="#">Show all notifications</a>
        </li>
      </ul>
      <!-- End Notification Dropdown Items -->
    </li>
    <!-- End Notification Nav -->
  </span>
</template>

<style scoped>
@import "@/assets/css/notify.css";
</style>
