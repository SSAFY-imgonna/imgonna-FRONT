import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/plans";

function createPlan(data, success, fail) {
  local.post(`${url}`, JSON.stringify(data)).then(success).catch(fail);
}

function getPlanList(param, success, fail) {
  local.get(`${url}`, { params: param }).then(success).catch(fail);
}

export { createPlan, getPlanList };
