import {
  localAxios,
  festivalAxios,
  coursesAxios,
  courseAxios,
  courseDetailInfoAxios,
  courseDetailIntroAxios,
} from "@/util/http-commons";

const local = localAxios();

function getAttractionList(param, success, fail) {
  local.get("/attractions").then(success).catch(fail);
}

function getSidoList(success, fail) {
  local.get(`/attractions/sido`).then(success).catch(fail);
}

function getGugunList(param, success, fail) {
  local.get(`/attractions/gugun`, { params: param }).then(success).catch(fail);
}

function getAttractionInfoList(contentIdList, success, fail) {
  local.get(`/attractions/${contentIdList}`).then(success).catch(fail);
}

const festival = festivalAxios();

function getFestivalList(param, success, fail) {
  festival.get().then(success).catch(fail);
}

const courses = coursesAxios();

function getCourseList(param, success, fail) {
  courses.get("", { params: param }).then(success).catch(fail);
}

const course = courseAxios();

function getCourse(param, success, fail) {
  course.get("", { params: param }).then(success).catch(fail);
}
const courseDetailInfo = courseDetailInfoAxios();

function getCourseDetailInfo(param, success, fail) {
  courseDetailInfo.get("", { params: param }).then(success).catch(fail);
}
const courseDetailIntro = courseDetailIntroAxios();

function getCourseDetailIntro(param, success, fail) {
  courseDetailIntro.get("", { params: param }).then(success).catch(fail);
}

export {
  getAttractionList,
  getSidoList,
  getGugunList,
  getFestivalList,
  getCourseList,
  getCourse,
  getCourseDetailInfo,
  getCourseDetailIntro,
  getAttractionInfoList,
};
