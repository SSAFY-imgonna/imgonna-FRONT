import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/notify";

function getNotifyCount(param, success, fail) {
  local.get(`${url}`, { params: param }).then(success).catch(fail);
}

function getNotifyList(param, success, fail) {
  local.get(`${url}/list`, { params: param }).then(success).catch(fail);
}

function getNotifyListAll(param, success, fail) {
  local.get(`${url}/mypage`, { params: param }).then(success).catch(fail);
}

function updateNotify(param, success, fail) {
  console.log(param);
  local.get(`${url}/read`, { params: param }).then(success).catch(fail);
}

function updateNotifyAll(param, success, fail) {
  local.get(`${url}/readAll`, { params: param }).then(success).catch(fail);
}

function deleteNotifyList(list, success, fail) {
  console.log(list);
  local.post(`${url}`, JSON.stringify(list), {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(success).catch(fail);
}
export {
  getNotifyCount,
  getNotifyList,
  getNotifyListAll,
  updateNotify,
  updateNotifyAll,
  deleteNotifyList,
};
