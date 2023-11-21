<script setup>
import { ref, watch, computed } from "vue";
import draggable from "vuedraggable";

const list = ref([]);

const dragging = ref(false);
const draggingInfo = computed(() => (dragging.value ? "under drag" : ""));

const checkMove = (e) => {
  console.log("Future index: " + e.draggedContext.futureIndex);
};

const props = defineProps({ attractions: Array });

// const attractions = ref();
watch(
  () => props.attractions,
  () => {
    // attractions.value = props.attractions;
    list.value = props.attractions;
  },
  { deep: true }
);
</script>

<template>
  <div class="row">
    <h4>나의 여행 코스</h4>
    <h6>원하는 장소를 검색해 추가하세요</h6>
    <div>
      <div class="alist">
        <draggable
          :list="list"
          item-key="contentId"
          class="list-group"
          ghost-class="ghost"
          :move="checkMove"
          @start="dragging = true"
          @end="dragging = false"
        >
          <template #item="{ element }">
            <div class="list-group-item card ms-0 mb-3 attraction-info">
              <div class="row g-0 col-lg-12" v-if="element">
                <div class="col-md-4">
                  <img
                    v-if="element.firstImage && element.firstImage.length > 0"
                    :src="element.firstImage"
                    class="img-fluid rounded-start"
                    alt="..."
                  />
                  <img
                    v-else-if="element.firstImage2 && element.firstImage2.length > 0"
                    :src="element.firstImage"
                    class="img-fluid rounded-start"
                    alt="..."
                  />
                  <img v-else src="/img/no_image.png" class="img-fluid rounded-start" alt="..." />
                </div>

                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">
                      <b>{{ element.title }}</b>
                    </h5>
                    <p class="card-text">{{ element.addr1 }} {{ element.addr2 }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.buttons {
  margin-top: 35px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.not-draggable {
  cursor: no-drop;
}

h4 {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 10px;
}
h6 {
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
  margin-bottom: 20px;
}
* {
  font-family: "Nanum Gothic", sans-serif !important;
}

.alist {
  /* position: absolute; */
  /* top: 150px; */
  /* bottom: 300px; */
  overflow-y: scroll;
  max-height: 740px;
}

.overflow-auto {
  overflow: auto !important;
}

.card {
  width: 90%;
}
</style>
