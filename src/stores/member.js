import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

import { doLogin, findById, tokenRegeneration, logout } from "@/api/member";
import { httpStatusCode } from "@/util/http-status";
import Swal from "sweetalert2";

export const useMemberStore = defineStore(
  "memberStore",
  () => {
    const router = useRouter();

    const isLogin = ref(false);
    const isLoginError = ref(false);
    const userInfo = ref(null);
    const isValidToken = ref(false);

    const userLogin = async (loginUser) => {
      await doLogin(
        loginUser,
        (response) => {
          let accessToken = response.data.accessToken;
          let refreshToken = response.data.refreshToken;
          console.log("accessToken", accessToken);
          console.log("refreshToken", refreshToken);
          isLogin.value = true;
          isLoginError.value = false;
          isValidToken.value = true;
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", refreshToken);
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "로그인 실패",
            text: "다시 로그인해주세요!",
          });
          isLogin.value = false;
          isLoginError.value = true;
          isValidToken.value = false;
        }
      );
    };

    const getUserInfo = (token) => {
      let decodeToken = jwtDecode(token);
      console.log("2. decodeToken", decodeToken);
      findById(
        decodeToken.id,
        (response) => {
          userInfo.value = response.data;
          console.log("3. getUserInfo data >> ", response.data);
        },
        async (error) => {
          if (error.response.status == 400) {
            console.log("유저 정보 없음!!!!");
          }
          if (error.response.status == 500) {
            console.error(
              "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
              error.response.status
            );
            isValidToken.value = false;

            await tokenRegenerate();
          }
        }
      );
    };

    const tokenRegenerate = async () => {
      console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("accessToken"));
      await tokenRegeneration(
        JSON.stringify(userInfo.value),
        (response) => {
          if (response.status === httpStatusCode.CREATE) {
            let accessToken = response.data;
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("accessToken", accessToken);
            isValidToken.value = true;
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === httpStatusCode.UNAUTHORIZED) {
            console.log("갱신 실패");
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              userInfo.value.userid,
              (response) => {
                if (response.status === httpStatusCode.OK) {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                isLogin.value = false;
                userInfo.value = null;
                isValidToken.value = false;
              },
              (error) => {
                console.error(error);
                isLogin.value = false;
                userInfo.value = null;
              }
            );
          }
        }
      );
    };

    const userLogout = async (id) => {
      await logout(
        id,
        (response) => {
          if (response.status === httpStatusCode.OK) {
            isLogin.value = false;
            userInfo.value = null;
            isValidToken.value = false;
            Swal.fire({
              icon: "success",
              title: "로그아웃 성공",
              text: "이용해주셔서 감사합니다!",
            });
          } else {
            console.error("유저 정보 없음!!!!");
          }
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "로그아웃 실패",
            text: "다음에 다시 시도해주세요!",
          });
          console.log(error);
        }
      );
    };

    return {
      isLogin,
      isLoginError,
      userInfo,
      isValidToken,
      userLogin,
      getUserInfo,
      tokenRegenerate,
      userLogout,
    };
  },
  { persist: { storage: sessionStorage } }
);
