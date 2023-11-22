import { computed, ref } from "vue";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const usePlanStore = defineStore(
  "planStore",
  () => {
    const plans = ref([]);
    const plansCnt = computed(() => plans.value.length);

    const addPlan = (attraction) => {
      const isValid = plans.value.some((plan) => plan.contentId == attraction.contentId);
      if (!isValid) {
        plans.value.push(attraction);
      }
    };

    const deletePlan = (attraction) => {
      plans.value = plans.value.filter((plan) => plan.contentId != attraction.contentId);
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
