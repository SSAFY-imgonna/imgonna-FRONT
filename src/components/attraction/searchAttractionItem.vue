<script setup>
import { ref } from "vue";
import { getAttractionList } from "@/api/diary";
const searchAttractionName = ref("");
const attractions = ref();
const emit = defineEmits(["selectAttraction", "addAttraction"]);

function findAttraction() {
  if (searchAttractionName.value.length == 0) {
    return;
  }
  getAttractionList(
    searchAttractionName.value,
    ({ data }) => {
      // console.log(data);
      attractions.value = data;
      // console.log(attractions.value);
    },
    (error) => {
      console.log(error);
    }
  );
}
const selectAttraction = (attraction) => {
  emit("selectAttraction", attraction);
};
const addAttraction = (attraction) => {
  emit("addAttraction", attraction);
};
</script>

<template>
  <div class="row">
    <h4>관광지를 검색하세요</h4>
    <fieldset>
      <span class="search-input-container">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="관광지를 검색해보세요!"
          autocomplete="on"
          v-model="searchAttractionName"
        />
        <i class="bi bi-search" @click="findAttraction" type="button"></i>
      </span>
    </fieldset>
    <div>
      <div class="alist">
        <div
          class="card ms-4 mb-3 attraction-info"
          v-for="attraction in attractions"
          :key="attraction.contentId"
        >
          <div class="row g-0" v-if="attraction" @click="selectAttraction(attraction)">
            <div class="col-md-4">
              <img
                v-if="attraction.firstImage && attraction.firstImage.length > 0"
                :src="attraction.firstImage"
                class="img-fluid rounded-start"
                alt="..."
              />
              <img
                v-else-if="attraction.firstImage2 && attraction.firstImage2.length > 0"
                :src="attraction.firstImage"
                class="img-fluid rounded-start"
                alt="..."
              />
              <img v-else src="/img/no_image.png" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">
                  <b>{{ attraction.title }}</b>
                  <button id="add" @click="addAttraction(attraction)">추가</button>
                </h5>
                <p class="card-text">{{ attraction.addr1 }} {{ attraction.addr2 }}</p>
                <!-- <p class="card-text">
                            <small class="text-body-secondary">{{ attraction.tel }}</small>
                          </p> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input#name {
  margin-bottom: 20px !important;
}
h4 {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 10px;
}
* {
  font-family: "Nanum Gothic", sans-serif !important;
}

#add {
  width: 60px !important;
  height: 30px !important;
  font-size: 10px !important;
  padding: 0px !important;
}
.alist {
  /* position: absolute; */
  /* top: 210px;
  bottom: 300px; */
  overflow-y: scroll;
  max-height: 700px;
}

.overflow-auto {
  overflow: auto !important;
}

.card {
  width: 90%;
}
</style>
