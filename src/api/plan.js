import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/plans";

function createPlan(data, success, fail) {
  local.post(`${url}`, JSON.stringify(data)).then(success).catch(fail);
}

export { createPlan };
