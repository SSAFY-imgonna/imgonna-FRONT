import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/diary";

function getDiaryList(param, success, fail) {
  local.get(`${url}`, { params: param }).then(success).catch(fail);
}

function getDiaryByDiaryNo(diaryNo, success, fail) {
  local.get(`${url}/${diaryNo}`).then(success).catch(fail);
}

function getAttractionList(title, success, fail) {
  console.log("검색하는 관광지명 : " + title);
  local.get(`${url}/attraction/${title}`).then(success).catch(fail);
}

async function createDiary(formData, success, fail) {
  console.log("diaryjs diary", formData);

  await local
    .post(`${url}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

function getModifyDiary(diaryNo, success, fail) {
  local.get(`${url}/${diaryNo}`).then(success).catch(fail);
}

function modifyDiary(diaryNo, formData, success, fail) {
  local
    .put(`${url}/${diaryNo}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(success)
    .catch(fail);
}

function deleteDiary(diaryNo, success, fail) {
  local.delete(`${url}/${diaryNo}`).then(success).catch(fail);
}

// 외부에서 쓸 수 있게 보내줌 -> 거기서 import해서 씀
export {
  getAttractionList,
  getDiaryList,
  getDiaryByDiaryNo,
  createDiary,
  getModifyDiary,
  modifyDiary,
  deleteDiary,
};
