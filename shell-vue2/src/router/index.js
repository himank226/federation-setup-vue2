import Vue from "vue";
import VueRouter from "vue-router";
import RemoteView from "../views/RemoteView.vue";
import { remoteApps } from "../../remoteConfig";

Vue.use(VueRouter);

// Dynamically generate routes based on remote config
const dynamicRoutes = remoteApps.map((app) => {
  return {
    path: app.path,
    name: app.route_name,
    component: RemoteView,
    meta: {
      scope: app.scope,
    },
  };
});

const routes = [
  ...dynamicRoutes,
  { path: "*", redirect: "/" },
  { path: "/", redirect: "/users" },
];

export default new VueRouter({
  mode: "history",
  routes,
});
