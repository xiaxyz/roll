import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/chat"
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("@/views/ChatBoxView.vue"),
    },
    {
      path: "/roll",
      name: "roll",
      component: () => import("@/views/RollItemView.vue"),
    },
    {
      path: "/share",
      name: "share",
      component: () => import("@/views/ShareScreenView.vue"),
    },
    {
      path: "/chess",
      name: "chess",
      component: () => import("@/views/ChineseChessView.vue")
    }
  ],
})

export default router
