<script setup>
const imageUrl = new URL("@/assets/img/springboot/upload/", import.meta.url).href;
const accompanyCss = new URL("@/assets/css/", import.meta.url).href;

import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/member";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import AccompanyCommentFormItem from "./item/AccompanyCommentFormItem.vue";
import AccompanyCommentListItem from "./item/AccompanyCommentListItem.vue";
import Swal from "sweetalert2";
import {
  getAccompanyByAccompanyNo,
  deleteAccompany,
  createAccompanyJoin,
  deleteAccompanyJoin,
} from "@/api/accompany";
import { getCommentListByAccompanyNo } from "@/api/accompanyComment";

const route = useRoute();
const router = useRouter();

const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);
const member = ref(userInfo);

const accompanyNo = ref(0);

const accompany = ref({});
const commentList = ref({});

const memberInfo = ref({
  id: null,
  writerId: "",
});

onMounted(() => {
  if (member.value != null) {
    memberInfo.value.id = member.value.id;
  }
  accompanyNo.value = route.params.accompanyNo;
  getAccompany();
  getComments();
});

watch(
  () => route.params,
  (value) => {
    accompanyNo.value = route.params.accompanyNo;
    console.log("감시", accompanyNo.value);
    getAccompany();
    getComments();
  }
);

const getAccompany = () => {
  console.log(accompanyNo.value + "번글 얻으러 가자!!!");
  // API 호출
  getAccompanyByAccompanyNo(
    accompanyNo.value,
    memberInfo.value,
    ({ data }) => {
      console.log(data);
      accompany.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const getComments = () => {
  console.log(accompanyNo.value + "번글 댓글 얻으러 가자!!!");
  getCommentListByAccompanyNo(
    accompanyNo.value,
    ({ data }) => {
      console.log(data);
      commentList.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

function moveList() {
  router.push({ name: "accompany-list" });
}

function moveModify() {
  router.push({ name: "accompany-modify", params: accompanyNo.value });
}

function onDeleteAccompany() {
  Swal.fire({
    title: "정말 삭제하시겠습니까?",
    text: "삭제하시면 되돌릴 수 없습니다!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#d33",
    confirmButtonColor: "#198754",
    confirmButtonText: "네, 삭제하겠습니다!",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      // API 호출
      deleteAccompany(
        accompanyNo.value,
        ({ data }) => {
          console.log(data);
          alert("글 삭제가 완료되었습니다.");
          router.push({ name: "accompany-list" });
        },
        (error) => {
          console.log(error);
        }
      );
      Swal.fire({
        title: "동행 글 삭제 완료",
        icon: "success",
      });
    }
  });
}

function register() {
  memberInfo.value.writerId = accompany.value.id;
  console.log(accompanyNo);
  console.log(memberInfo.value);
  createAccompanyJoin(
    accompanyNo.value,
    memberInfo.value,
    ({ data }) => {
      console.log(data);

      alert("동행 신청이 완료되었습니다.");
      getAccompany();
    },
    (error) => {
      console.log(error);
    }
  );
}

function cancelRegister() {
  console.log(accompanyNo);
  console.log(memberInfo.value);
  deleteAccompanyJoin(
    accompanyNo.value,
    memberInfo.value,
    ({ data }) => {
      console.log(data);

      alert("동행 취소가 완료되었습니다.");
      getAccompany();
    },
    (error) => {
      console.log(error);
    }
  );
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center mt-4 mt-lg-5">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="row my-2">
          <h2 class="px-2">{{ accompany.title }}</h2>
        </div>
        <div class="row">
          <hr class="hr-style col-12" size="1" width="100%" />
          <div class="col-8 align-content-center">
            <div class="clearfix align-content-center">
              <img
                class="avatar me-2 float-md-start bg-light p-2"
                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
              />
              <div>
                <span class="fw-bold">{{ accompany.id }}</span> <br />
                <span class="text-secondary fw-light me-2">
                  작성일 : {{ accompany.createdTime }}
                </span>
                <span
                  ><font-awesome-icon icon="fa-solid fa-eye" class="mx-2" /> {{ accompany.hit }}
                </span>
              </div>
            </div>
          </div>
          <!-- 댓글 개수 부분 나중에 동적으로 수정해야 -->
          <div class="col-4 align-self-center text-end">
            댓글 : <span id="commentCount">1개</span>
          </div>
          <div class="divider mb-3"></div>
          <hr class="hr-style col-12" size="1" width="100%" />
          <div class="divider mb-3"></div>
          <div>
            <!-- 이미지가 있을때만 보여지게 -->
            <div class="mt-3" v-if="accompany.fileInfos && accompany.fileInfos.length > 0">
              <img
                class="col-8 imgFile"
                alt="place Image"
                :src="`${imageUrl}/${accompany.fileInfos[0].saveFolder}/${accompany.fileInfos[0].saveFile}`"
              />
            </div>
            <div class="mb-4">
              <div class="d-flex align-items-center my-2">
                <font-awesome-icon icon="fa-solid fa-location-dot" class="me-2" /> 장소 :
                {{ accompany.addr }}
              </div>
              <div class="d-flex align-items-center my-2">
                <font-awesome-icon icon="fa-solid fa-calendar-days" class="me-2" /> 시간 :
                {{ accompany.joinTime }}
              </div>
              <div class="d-flex align-items-center my-2">
                <font-awesome-icon icon="fa-solid fa-user-group" class="me-2" /> 현재 인원 :
                {{ accompany.currentNum }} / {{ accompany.limitNum }}명
              </div>
            </div>
            {{ accompany.content }}
          </div>
          <div class="divider mt-3 mb-3"></div>
          <div class="d-flex justify-content-end">
            <button
              type="button"
              id="btn-list"
              class="btn btn-outline-primary mb-3"
              @click="moveList"
            >
              글목록
            </button>
            <!-- 글 작성자 일때 -->
            <span v-if="member && member.id == accompany.id">
              <button
                type="button"
                id="btn-mv-modify"
                class="btn btn-outline-success mb-3 ms-1"
                @click="moveModify"
              >
                글수정
              </button>
              <button
                type="button"
                id="btn-delete"
                class="btn btn-outline-danger mb-3 ms-1"
                @click="onDeleteAccompany"
              >
                글삭제
              </button>
            </span>
            <!-- 글 작성자가 아닐때 -->
            <span v-else-if="member && member.id != accompany.id">
              <!-- 이미 신청하였을때 -->
              <span v-if="accompany.isJoin == true">
                <button
                  type="button"
                  id="btn-join"
                  class="btn btn-outline-secondary mb-3 ms-1"
                  @click="cancelRegister"
                >
                  신청취소
                </button>
              </span>
              <!-- 아직 신청하지 않았을때 -->
              <span v-else>
                <span v-if="accompany.status == '모집중'">
                  <button
                    type="button"
                    id="btn-join"
                    class="btn btn-outline-success mb-3 ms-1"
                    @click="register"
                  >
                    신청하기
                  </button>
                </span>
                <span v-if="accompany.status == '모집완료'">
                  <button
                    type="button"
                    id="btn-join"
                    class="btn btn-outline-secondary mb-3 ms-1"
                    onclick="return false;"
                  >
                    모집완료
                  </button>
                </span>
                <span v-if="accompany.status == '모집중단'">
                  <button
                    type="button"
                    id="btn-join"
                    class="btn btn-outline-secondary mb-3 ms-1"
                    onclick="return false;"
                  >
                    모집완료
                  </button>
                </span>
              </span>
            </span>
          </div>
          <hr class="hr-style col-12 mt-3" size="1" width="100%" />
          <!-- 댓글 폼 -->
          <AccompanyCommentFormItem @insert-comment="getComments" />
          <!-- 댓글 목록 -->
          <AccompanyCommentListItem
            v-for="comment in commentList"
            :key="comment.commentNo"
            :comment="comment"
            @get-comments="getComments"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/accompany.css";

/* 상세 부분 */
.imgFile {
  width: auto;
  height: auto;
  max-width: 400px;
  max-height: 400px;
}
/* 댓글 부분 */
div.inner-text {
  display: inline-block;
  position: relative;
}
.inner-text {
  display: block;
  height: 130px;
  width: 100%;
  resize: none;
}
#inner-submit {
  position: absolute;
  bottom: 0px;
  right: 0px;
  border: none;
}
#comment-div {
  padding: 20px 10px 20px 10px;
  margin-top: 10px;
  background-color: #fafafa;
  border-radius: 5px;
}
/* 얘는 쓰일지 안쓰일지 몰라유 ㅠㅠ */
div#loading,
div.paging-button {
  text-align: center;
}
</style>
