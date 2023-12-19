const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "Page Auth",
        component: () => import("pages/PageAuth.vue"),
      },
      // {
      //   path: "/chat",
      //   name: "Page Chat",
      //   component: () => import("pages/PageChat.vue"),
      // },
      { 
        path: '/chat/:id', 
        name: "Page Chat",
        component: () => import("pages/PageChat.vue")
      },
      {
        path: "/chats",
        name: "Page Chats",
        component: () => import("pages/PageChatsUsers.vue"),
      },
      {
        path: "/users",
        name: "Page Contacts",
        component: () => import("pages/PageUsers.vue"),
      },
    ],
    props: true,
  },

  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    component: () => import("pages/ErrorNotFound.vue"),
    props: true,
  },
];

export default routes;
