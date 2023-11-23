import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/accompany";

function getAccompanyList(param, success, fail) {
  local.get(`${url}`, { params: param }).then(success).catch(fail);
}

function getAccompanyRankList(param, success, fail) {
  local.get(`${url}/rank`).then(success).catch(fail);
}

function getAccompanyByAccompanyNo(accompanyNo, memberInfo, success, fail) {
  local.get(`${url}/${accompanyNo}`, { params: memberInfo }).then(success).catch(fail);
}

async function createAccompany(formData, success, fail) {
  console.log("accompanyjs accompany", formData);

  await local
    .post(`${url}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

function getModifyAccompany(accompanyNo, success, fail) {
  local.get(`${url}/${accompanyNo}`).then(success).catch(fail);
}

function modifyAccompany(accompanyNo, formData, success, fail) {
  local
    .put(`${url}/${accompanyNo}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

function deleteAccompany(accompanyNo, success, fail) {
  local.delete(`${url}/${accompanyNo}`).then(success).catch(fail);
}

function createAccompanyJoin(accompanyNo, memberInfo, success, fail) {
  console.log(accompanyNo, memberInfo);
  local.post(`${url}/${accompanyNo}`, JSON.stringify(memberInfo)).then(success).catch(fail);
}

function deleteAccompanyJoin(accompanyNo, memberInfo, success, fail) {
  console.log(accompanyNo, memberInfo);
  local.delete(`${url}/${accompanyNo}/join`, { params: memberInfo }).then(success).catch(fail);
}

// 외부에서 쓸 수 있게 보내줌 -> 거기서 import해서 씀
export {
  getAccompanyList,
  getAccompanyByAccompanyNo,
  createAccompany,
  getModifyAccompany,
  modifyAccompany,
  deleteAccompany,
  createAccompanyJoin,
  deleteAccompanyJoin,
  getAccompanyRankList,
};
