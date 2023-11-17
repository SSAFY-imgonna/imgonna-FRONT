import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/accompany";

function createAccompanyComment(accompanyNo, comment, success, fail) {
  console.log("accompanyCommentjs inquiry", comment);
  local.post(`${url}/${accompanyNo}/comments`, JSON.stringify(comment)).then(success).catch(fail);
}

function getCommentListByAccompanyNo(accompanyNo, success, fail) {
  local.get(`${url}/${accompanyNo}/comments`).then(success).catch(fail);
}

function deleteComment(accompanyNo, commentNo, success, fail) {
  local.delete(`${url}/${accompanyNo}/comments/${commentNo}`).then(success).catch(fail);
}

function modifyAccompanyComment(accompanyNo, commentNo, comment, success, fail) {
  local
    .put(`${url}/${accompanyNo}/comments/${commentNo}`, JSON.stringify(comment))
    .then(success)
    .catch(fail);
}

// 외부에서 쓸 수 있게 보내줌 -> 거기서 import해서 씀
export {
  createAccompanyComment,
  getCommentListByAccompanyNo,
  deleteComment,
  modifyAccompanyComment,
};
