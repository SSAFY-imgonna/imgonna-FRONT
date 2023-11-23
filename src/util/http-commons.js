import axios from "axios";
import { useMemberStore } from "@/stores/member.js";
import Swal from "sweetalert2";

const {
  VITE_VUE_API_URL,
  VITE_FESTIVAL_URL,
  VITE_COURSES_URL,
  VITE_COURSE_URL,
  VITE_OPEN_API_SERVICE_KEY,
} = import.meta.env;

// local vue api axios instance
function localAxios() {
  // create로 axios를 객체로 만듦 -> .get, .delete 등으로 호출
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  instance.interceptors.request.use(
    function (config) {
      const { isLogin, accessToken } = useMemberStore();

      if (isLogin && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      console.log(response);
      return response;
    },
    function (error) {
      console.log("ERROR >>>", error.response.data);
      const originalRequest = error.config;
      const { refreshToken, updateAccessToken } = useAuthStore();
      // Unauthorized : request a new accessToken
      if (error.response.status === 401) {
        Swal.fire({
          icon: "error",
          text: "로그인이 필요한 서비스입니다. 로그인 후 다시 이용해주세요!",
        });
      }

      return Promise.reject(error);
    }
  );

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
      "MGBvaCV9CcwjcVwyp7LL0%2Bz%2FvFFtP5fvNrcjdrUd13j4DPMW0CIAPSGrzUAREhDrAsC3yz2EscxtkP%2FYwPX5mQ%3D%3D" +
      "&areaCode=&sigunguCode=&MobileOS=ETC&listYN=Y&MobileApp=AppTest&arrange=R&numOfRows=20&pageNo=1&_type=json",
    headers: {
      Accept: "*/*;q=0.9",
    },
  });
  return instance;
}

function coursesAxios() {
  const instance = axios.create({
    baseURL: VITE_COURSES_URL,
    headers: {
      Accept: "*/*;q=0.9",
    },
  });
  return instance;
}
function courseAxios() {
  const instance = axios.create({
    baseURL: VITE_COURSE_URL,
    headers: {
      Accept: "*/*;q=0.9",
    },
  });
  return instance;
}
function courseDetailIntroAxios() {
  const instance = axios.create({
    baseURL: "http://apis.data.go.kr/B551011/KorService1/detailIntro1",
    headers: {
      Accept: "*/*;q=0.9",
    },
  });
  return instance;
}
function courseDetailInfoAxios() {
  const instance = axios.create({
    baseURL: "http://apis.data.go.kr/B551011/KorService1/detailInfo1",
    headers: {
      Accept: "*/*;q=0.9",
    },
  });
  return instance;
}

export {
  localAxios,
  festivalAxios,
  coursesAxios,
  courseAxios,
  courseDetailInfoAxios,
  courseDetailIntroAxios,
};
