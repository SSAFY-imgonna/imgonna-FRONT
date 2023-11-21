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
      path: "/area",
      name: "area",
      component: () => import("@/views/TheAreaView.vue"),
    },
    {
      path: "/course",
      name: "course",
      component: () => import("@/views/TheCourseView.vue"),
      redirect: { name: "course-list" },
      children: [
        {
          path: "",
          name: "course-list",
          component: () => import("@/components/course/CourseList.vue"),
        },
        {
          path: ":contentId",
          name: "course-view",
          component: () => import("@/components/course/CourseView.vue"),
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
    // diary
    {
      path: "/diary",
      name: "diary",
      component: () => import("../views/DiaryView.vue"),
      redirect: { name: "diary-list" },
      children: [
        {
          path: "",
          name: "diary-list",
          component: () => import("@/components/diary/DiaryList.vue"),
        },
        {
          path: ":diaryNo",
          name: "diary-view",
          component: () => import("@/components/diary/DiaryView.vue"),
        },
        {
          path: "",
          name: "diary-write",
          component: () => import("@/components/diary/DiaryWrite.vue"),
        },
        {
          path: ":diaryNo",
          name: "diary-modify",
          component: () => import("@/components/diary/DiaryModify.vue"),
        },
      ],
    },
    // plan
    // {
    //   path: "/plan",
    //   name: "plan",
    //   component: () => import("../views/PlanView.vue"),
    //   redirect: { name: "plan-view" },
    //   children: [
    //     {
    //       path: "",
    //       name: "plan-view",
    //       component: () => import("../views/PlanView.vue"),
    //     },
    //   ],
    // },
    {
      path: "/plan",
      name: "plan",
      component: () => import("../views/ThePlanView.vue"),
      redirect: { name: "plan-list" },
      children: [
        {
          path: "",
          name: "plan-list",
          component: () => import("@/components/plan/PlanList.vue"),
        },
        {
          path: ":planNo",
          name: "plan-view",
          component: () => import("@/components/plan/PlanView.vue"),
        },
        {
          path: "/create",
          name: "plan-write",
          component: () => import("@/components/plan/PlanWrite.vue"),
        },
        // // {
        // //   path: "",
        // //   name: "diary-modify",
        // //   component: () => import("@/components/diary/DiaryModify.vue"),
        // // },
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
  ],
});

export default router;
