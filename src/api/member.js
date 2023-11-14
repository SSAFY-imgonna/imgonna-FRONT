import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/members";

function doLogin(input, success, fail) {
  local.post(`${url}/login`, JSON.stringify(input)).then(success).catch(fail);
}

function doSignUp(input, success, fail) {
  local.post(`${url}`, JSON.stringify(input)).then(success).catch(fail);
}

function checkId(param, success, fail) {
  local.get(`${url}/check/id`, { params: param }).then(success).catch(fail);
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

export { doLogin, doSignUp, checkId };
