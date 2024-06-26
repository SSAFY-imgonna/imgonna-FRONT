import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/qna";

// function getInquiryList(param, success, fail) {
//   local.get(`${url}`, { params: param }).then(success).catch(fail);
// }

// function getInquiryByInquiryNo(qnaNo, success, fail) {
//   local.get(`${url}/${qnaNo}`).then(success).catch(fail);
// }

function createQnaComment(qnaNo, comment, success, fail) {
  console.log("qnaCommentjs inquiry", comment);
  local.post(`${url}/${qnaNo}/comments`, JSON.stringify(comment)).then(success).catch(fail);
}

function getCommentListByInquiryNo(qnaNo, success, fail) {
  local.get(`${url}/${qnaNo}/comments`).then(success).catch(fail);
}

function deleteComment(qnaNo, commentNo, success, fail) {
  local.delete(`${url}/${qnaNo}/comments/${commentNo}`).then(success).catch(fail);
}

function modifyQnaComment(qnaNo, commentNo, comment, success, fail) {
  local
    .put(`${url}/${qnaNo}/comments/${commentNo}`, JSON.stringify(comment))
    .then(success)
    .catch(fail);
}

// 외부에서 쓸 수 있게 보내줌 -> 거기서 import해서 씀
export { createQnaComment, getCommentListByInquiryNo, deleteComment, modifyQnaComment };
