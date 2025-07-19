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
      component: () => import("@/views/ChatView.vue"),
    },
    {
      path: "/roll",
      name: "roll",
      component: () => import("@/views/RollView.vue"),
    },
    {
      path: "/chess",
      name: "chess",
      component: () => import("@/views/ChineseChess.vue")
    }
  ],
})

export default router
