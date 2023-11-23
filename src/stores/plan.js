import { computed, ref } from "vue";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const usePlanStore = defineStore(
  "planStore",
  () => {
    const plans = ref([]);
    const plansCnt = computed(() => plans.value.length);

    const addPlan = (attraction) => {
      const duplicate = plans.value.some((plan) => plan.contentId == attraction.contentId);
      if (duplicate) {
        Swal.fire({
          icon: "error",
          text: "이미 존재하는 관광지입니다!",
        });
        return;
      }
      plans.value.push(attraction);
    };

    const deletePlan = (attraction) => {
      if (plans.value.length == 0) {
        Swal.fire({
          icon: "error",
          text: "관광지는 최소 1개가 존재해야 합니다!",
        });
      } else {
        plans.value = plans.value.filter((plan) => plan.contentId != attraction.contentId);
      }
    };

    const updatePlans = (newPlans) => {
      plans.value = newPlans;
      console.log("담겼음 !!");
    };

    const deletePlans = () => {
      plans.value = [];
      console.log("싹 지웠음 !!");
    };

    return {
      plans,
      plansCnt,
      addPlan,
      deletePlan,
      updatePlans,
      deletePlans,
    };
  },
  { persist: { storage: localStorage } }
);
