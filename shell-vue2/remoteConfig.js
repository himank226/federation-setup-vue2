// Define the list of remote apps with their configurations (path, scope, name, URL, and loader)
export const remoteApps = [
  {
    path: "/users",
    scope: "user_app_vue3/List",
    route_name: "users",
    app_name: "user_app_vue3",
    url: "http://localhost:8081/remoteEntry.js",
    loader: () => import("user_app_vue3/List"),
  },
  {
    path: "/edit-user",
    scope: "edit_user_app_vue3/Edit",
    route_name: "edit-user",
    app_name: "edit_user_app_vue3",
    url: "http://localhost:8082/remoteEntry.js",
    loader: () => import("edit_user_app_vue3/Edit"),
  },
];
