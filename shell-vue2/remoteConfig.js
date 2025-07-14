export const remoteApps = [
  {
    path: "/users",
    scope: "user_app_vue3",
    route_name: "users",
    app_name: "user_app_vue3",
    devUrl: "http://localhost:8081/remoteEntry.js",
    prodUrl: "https://users-app-vue3.vercel.app/remoteEntry.js",
    loader: () => import("user_app_vue3/mount"),
  },
  {
    path: "/edit-user",
    scope: "edit_user_app_vue3",
    app_name: "edit_user_app_vue3",
    module: "./mount",
    route_name: "edit-user",
    devUrl: "http://localhost:8082/remoteEntry.js",
    prodUrl: "https://edit-user-app-vue3-liard.vercel.app/remoteEntry.js",
    loader: () => import("edit_user_app_vue3/mount"),
  },
];
