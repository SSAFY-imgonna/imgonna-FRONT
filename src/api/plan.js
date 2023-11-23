import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/plans";

function createPlan(data, success, fail) {
  local.post(`${url}`, JSON.stringify(data)).then(success).catch(fail);
}

function getPlanList(param, success, fail) {
  local.get(`${url}`, { params: param }).then(success).catch(fail);
}

function getPlanByPlanNo(planNo, success, fail) {
  local.get(`${url}/${planNo}`).then(success).catch(fail);
}

function deletePlanByPlanNo(planNo, success, fail) {
  local.delete(`${url}/${planNo}`).then(success).catch(fail);
}

export { createPlan, getPlanList, getPlanByPlanNo, deletePlanByPlanNo };
