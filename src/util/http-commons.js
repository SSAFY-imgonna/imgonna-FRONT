import axios from "axios";

const { VITE_VUE_API_URL, VITE_FESTIVAL_URL, VITE_COURSE_URL, VITE_OPEN_API_SERVICE_KEY } =
  import.meta.env;

// local vue api axios instance
function localAxios() {
  // create로 axios를 객체로 만듦 -> .get, .delete 등으로 호출
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

function festivalAxios() {
  var today = new Date();

  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);

  var dateString = year + month;

  let startDate = dateString + "01";
  let endDate = dateString + "30";

  const instance = axios.create({
    baseURL:
      VITE_FESTIVAL_URL +
      "?eventStartDate=" +
      startDate +
      "&eventEndDate=" +
      endDate +
      "&ServiceKey=" +
      VITE_OPEN_API_SERVICE_KEY +
      "&areaCode=&sigunguCode=&MobileOS=ETC&listYN=Y&MobileApp=AppTest&arrange=A&numOfRows=20&pageNo=1&_type=json",
    // headers: {
    //   "Content-Type": "xml;charset=utf-8",
    // },
  });
  return instance;
}

function courseAxios() {
  const instance = axios.create({
    baseURL: VITE_COURSE_URL,
    // "?ServiceKey=" +
    // VITE_OPEN_API_SERVICE_KEY +
    // "&numOfRows=12&pageNo=1&MobileOS=ETC&MobileApp=AppTest&listYN=Y&arrange=A&contentTypeId=&areaCode=&sigunguCode=&cat1=C01&cat2=&cat3=&_type=json",
    // headers: {
    //   "Content-Type": "xml;charset=utf-8",
    // },
  });
  return instance;
}

export { localAxios, festivalAxios, courseAxios };
