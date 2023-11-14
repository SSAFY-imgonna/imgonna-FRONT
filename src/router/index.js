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
    // {
    //   path: "/members",
    //   name: "members",
    //   component: () => import("@/components/members/MemberLogin.vue"),
    // },
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
  ],
});

export default router;
