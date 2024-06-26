import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/qna";

function getInquiryList(param, success, fail) {
  local.get(`${url}`, { params: param }).then(success).catch(fail);
}

function getInquiryByInquiryNo(qnaNo, success, fail) {
  local.get(`${url}/${qnaNo}`).then(success).catch(fail);
}

function createInquiry(inquiry, success, fail) {
  console.log("qnajs inquiry", inquiry);
  local.post(`${url}`, JSON.stringify(inquiry)).then(success).catch(fail);
}

function getModifyInquiry(qnaNo, success, fail) {
  local.get(`${url}/${qnaNo}`).then(success).catch(fail);
}

function modifyInquiry(qnaNo, inquiry, success, fail) {
  local.put(`${url}/${qnaNo}`, JSON.stringify(inquiry)).then(success).catch(fail);
}

function deleteInquiry(qnaNo, success, fail) {
  local.delete(`${url}/${qnaNo}`).then(success).catch(fail);
}

// 외부에서 쓸 수 있게 보내줌 -> 거기서 import해서 씀
export {
  getInquiryList,
  getInquiryByInquiryNo,
  createInquiry,
  getModifyInquiry,
  modifyInquiry,
  deleteInquiry,
};
