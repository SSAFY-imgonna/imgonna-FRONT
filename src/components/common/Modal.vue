<script setup>
defineProps({
  isShownModal: Boolean,
});

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};
</script>

<template>
  <div id="modalWrap" v-show="isShownModal">
    <div id="modalContent">
      <div id="modalBody">
        <span id="closeBtn" @click="closeModal">&times;</span>
        <!-- 모달창에 넣을 내용 -->
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#btnWrap {
  width: 500px;
  margin: 100px auto;
}

#popupBtn {
  width: 150px;
  height: 50px;
  padding: 10px 5px;
}

#modalWrap {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

#modalBody {
  width: 500px;
  height: 300px;
  padding: 30px 30px;
  margin: 0 auto;
  border: 1px solid #777;
  background-color: #fff;
}

#closeBtn {
  float: right;
  font-weight: bold;
  color: #777;
  font-size: 25px;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>
