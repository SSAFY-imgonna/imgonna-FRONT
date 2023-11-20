import { localAxios, festivalAxios } from "@/util/http-commons";

const local = localAxios();

function getAttractionList(param, success, fail) {
  local.get("/attractions", { params: param }).then(success).catch(fail);
}

function getSidoList(success, fail) {
  local.get(`/attractions/sido`).then(success).catch(fail);
}

function getGugunList(param, success, fail) {
  local.get(`/attractions/gugun`, { params: param }).then(success).catch(fail);
}

const festival = festivalAxios();

function getFestivalList(param, success, fail) {
  festival.get().then(success).catch(fail);
}

export { getAttractionList, getSidoList, getGugunList, getFestivalList };
