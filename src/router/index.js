import { createRouter, createWebHistory } from "vue-router";
import TheMainView from "@/views/TheMainView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMainView,
    },
    {
      path: "/attractions",
      name: "attraction",
      component: () => import("@/views/TheAttractionView.vue"),
    },
    {
      path: "/mypage",
      name: "mypage",
      component: () => import("@/views/MyPageView.vue"),
      redirect: { name: "member-info" },
      children: [
        {
          path: "",
          name: "member-info",
          component: () => import("@/components/members/MemberInfo.vue"),
        },
        {
          path: "",
          name: "member-modify",
          component: () => import("@/components/members/MemberModify.vue"),
        },
        {
          path: "",
          name: "member-modify-pw",
          component: () => import("@/components/members/MemberModifyPw.vue"),
        },
      ],
    },
    {
      path: "/qna",
      name: "qna",
      component: () => import("../views/QnaView.vue"),
      redirect: { name: "qna-list" },
      children: [
        {
          path: "",
          name: "qna-list",
          component: () => import("@/components/qna/QnaList.vue"),
        },
        {
          path: ":qnaNo",
          name: "qna-view",
          component: () => import("@/components/qna/QnaView.vue"),
        },
        {
          path: "",
          name: "qna-write",
          component: () => import("@/components/qna/QnaWrite.vue"),
        },
        {
          path: ":qnaNo",
          name: "qna-modify",
          component: () => import("@/components/qna/QnaModify.vue"),
        },
      ],
    },
    // accompany
    {
      path: "/accompany",
      name: "accompany",
      component: () => import("../views/AccompanyView.vue"),
      redirect: { name: "accompany-list" },
      children: [
        {
          path: "",
          name: "accompany-list",
          component: () => import("@/components/accompany/AccompanyList.vue"),
        },
        {
          path: ":accompanyNo",
          name: "accompany-view",
          component: () => import("@/components/accompany/AccompanyView.vue"),
        },
        {
          path: "",
          name: "accompany-write",
          component: () => import("@/components/accompany/AccompanyWrite.vue"),
        },
        {
          path: ":accompanyNo",
          name: "accompany-modify",
          component: () => import("@/components/accompany/AccompanyModify.vue"),
        },
      ],
    },
  ],
});

export default router;
