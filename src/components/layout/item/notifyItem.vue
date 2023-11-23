<script setup>
import { ref, onMounted, watch } from "vue";
// import { getNotifyCount, getNotifyList, updateNotify, deleteNotify } from "@/api/notify";
import { getNotifyCount, getNotifyList, updateNotifyAll } from "@/api/notify";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import NotifyListItem from "./notifyListItem.vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({ notifyAgain: Boolean });

watch(
  () => props.notifyAgain,
  (value) => {
    console.log("값바뀜");
    NotifyCount();
  }
);
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);

const router = useRouter();
const route = useRoute();

const param = ref({
  id: "",
});

const notifyCount = ref(0);
onMounted(() => {
  if (member.value != null) {
    param.value.id = member.value.id;
    NotifyCount();
    // NotifyList();
  }
});

const notifyList = ref([]);
const NotifyCount = () => {
  getNotifyCount(
    param.value,
    ({ data }) => {
      notifyCount.value = data;
      console.log("개수 구함 ", notifyCount.value);
    },
    (error) => {
      console.log(error);
    }
  );
};

const NotifyList = () => {
  getNotifyList(
    param.value,
    ({ data }) => {
      notifyList.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const getNotifyAgain = () => {
  NotifyCount();
  NotifyList();
};

const readAll = () => {
  updateNotifyAll(
    param.value,
    ({ data }) => {
      getNotifyCount();
      getNotifyAgain();
    },
    (error) => {
      console.log(error);
    }
  );
};

const moveTotalAlarm = () => {
  console.log("전체 알람 페이지로 이동");
  closeToggle();
  router.push({ name: "member-notify" });
};

const closeToggle = () => {
  console.log("드롭다운 닫혀랏!!");
  // 드롭다운을 닫기 위해 Bootstrap 메서드 호출
  document.getElementById("dropdown-menu").classList.remove("show"); // 'myDropdown'은 드롭다운의 id
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
        aria-expanded="dropdownOpen"
      >
        <i class="bi bi-bell"></i>
        <span class="badge bg-success badge-number">{{ notifyCount }}</span> </a
      ><!-- End Notification Icon -->

      <ul
        class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications"
        id="dropdown-menu"
      >
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
        <span style="max-height: 300px; overflow-y: scroll; display: block">
          <NotifyListItem
            v-for="notify in notifyList"
            :key="notify.notifyNo"
            :notify="notify"
            @getNotifyAgain="getNotifyAgain"
            @closeToggle="closeToggle"
          >
            ></NotifyListItem
          >
        </span>
        <li class="dropdown-footer">
          <a href="#" style="text-decoration: none">
            <span
              style="
                color: initial;
                font-size: 10pt;
                font-weight: 600;
                text-decoration: none;
                cursor: pointer;
              "
              onmouseover="this.style.color='#3C763D'"
              onmouseout="this.style.color='initial'"
              @click="moveTotalAlarm"
              >전체 알림 보러가기</span
            >
          </a>
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
