const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "Page Contacts",
        component: () => import("pages/PageUsers.vue"),
      },
      {
        path: "/chat",
        name: "Page Chat",
        component: () => import("pages/PageChat.vue"),
      },
      {
        path: "/auth",
        name: "Page Auth",
        component: () => import("pages/PageAuth.vue"),
      },
    ],
    props: true,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    component: () => import("pages/ErrorNotFound.vue"),
    props: true,
  },
];

export default routes;
