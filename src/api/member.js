import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/members";

function doSignUp(input, success, fail) {
  local.post(`${url}`, JSON.stringify(input)).then(success).catch(fail);
}

function checkId(param, success, fail) {
  local.get(`${url}/check/id`, { params: param }).then(success).catch(fail);
}

function userFindId(data, success, fail) {
  local.post(`${url}/find/id`, JSON.stringify(data)).then(success).catch(fail);
}

function userFindPassword(data, success, fail) {
  local.post(`${url}/find/pw`, JSON.stringify(data)).then(success).catch(fail);
}

function doModify(data, success, fail) {
  local.put(`${url}/${data.id}`, JSON.stringify(data)).then(success).catch(fail);
}

function doModifyPassword(id, data, success, fail) {
  local.put(`${url}/${id}/pw`, data).then(success).catch(fail);
}

async function doLogin(param, success, fail) {
  // console.log("param", param);
  await local.post(`${url}/login`, param).then(success).catch(fail);
}

async function findById(id, success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`${url}/info/${id}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`${url}/refresh`, user).then(success).catch(fail);
}

async function logout(id, success, fail) {
  await local.get(`${url}/logout/${id}`).then(success).catch(fail);
}

async function doDelete(id, data, success, fail) {
  await local.post(`${url}/${id}`, JSON.stringify(data)).then(success).catch(fail);
}

export {
  doSignUp,
  checkId,
  doModify,
  doModifyPassword,
  doLogin,
  findById,
  tokenRegeneration,
  logout,
  userFindId,
  userFindPassword,
  doDelete,
};
