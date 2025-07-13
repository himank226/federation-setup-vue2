export const remoteApps = [
  {
    path: "/users",
    scope: "user_app_vue3/List",
    route_name: "users",
    app_name: "user_app_vue3",
    devUrl: "http://localhost:8081/remoteEntry.js",
    prodUrl:
      "https://himank226.github.io/federation-setup-vue2/users-app-vue3/remoteEntry.js",
    loader: () => import("user_app_vue3/List"),
  },
  {
    path: "/edit-user",
    scope: "edit_user_app_vue3/Edit",
    route_name: "edit-user",
    app_name: "edit_user_app_vue3",
    devUrl: "http://localhost:8082/remoteEntry.js",
    prodUrl:
      "https://himank226.github.io/federation-setup-vue2/edit-user-app-vue3/remoteEntry.js",
    loader: () => import("edit_user_app_vue3/Edit"),
  },
];
