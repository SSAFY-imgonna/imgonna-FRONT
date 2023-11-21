<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { getNotifyListAll, deleteNotifyList } from "@/api/notify";
import { updateNotify } from "@/api/notify";

const router = useRouter();
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);

const emit = defineEmits(["getNotifyAgain"]);

const param = ref({
  id: "",
});

const notifyList = ref([]);
onMounted(() => {
  if (member.value != null) {
    param.value.id = member.value.id;
  }
  NotifyListAll();
});

const NotifyListAll = () => {
  getNotifyListAll(
    param.value,
    ({ data }) => {
      notifyList.value = data;
      console.log(notifyList);
    },
    (error) => {
      console.log(error);
    }
  );
};

const selected = ref([]);
const selectedAll = ref(false);

const allSelected = () => {
  if (!selectedAll.value) {
    selectedAll.value = true;
    for (let i = 0; i < notifyList.value.length; i++) {
      console.log(notifyList.value[i]);
      selected.value.push(notifyList.value[i].notifyNo);
      console.log(selected.value);
    }
  } else {
    selectedAll.value = false;
    selected.value = [];
  }
};

const deleteSelected = () => {
  deleteNotifyList(
    selected.value,
    ({ data }) => {
      console.log("삭제됨");
      NotifyListAll();
    },
    (error) => {
      console.log(error);
    }
  );
};

function moveAccompany(notify) {
  if (notify.tableName == 1) {
    readEvent(notify);
  }
}

function readEvent(notify) {
  updateNotify(
    { notifyNo: notify.notifyNo },
    ({ data }) => {
      emit("getNotifyAgain");
      router.push({ name: "accompany-view", params: { accompanyNo: notify.pkNo } });
    },
    (error) => {
      console.log(error);
    }
  );
}
</script>

<template>
  <button class="btn btn-sm btn-dark" @click="deleteSelected">삭제</button>
  <table class="table table-hover">
    <thead>
      <tr>
        <th><input type="checkbox" @click="allSelected" /></th>
        <th scope="col">번호</th>
        <th scope="col">알림분류</th>
        <th scope="col">글번호</th>
        <th scope="col">내용</th>
        <th scope="col">발신자</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="notify in notifyList"
        :key="notify.notifyNo"
        class="mouseOn"
        @click="moveAccompany(notify)"
      >
        <td><input type="checkbox" v-model="selected" :value="notify.notifyNo" /></td>
        <th :class="{ readColor: notify.isRead == 1 }" scope="row">{{ notify.notifyNo }}</th>
        <td :class="{ readColor: notify.isRead == 1 }" v-if="notify.tableName == 1">동행</td>
        <td :class="{ readColor: notify.isRead == 1 }">{{ notify.pkNo }}</td>
        <td :class="{ readColor: notify.isRead == 1 }">{{ notify.content }}</td>
        <td :class="{ readColor: notify.isRead == 1 }">{{ notify.send }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.mouseOn {
  cursor: pointer;
}
.readColor {
  color: rgb(149, 149, 149);
}
</style>
