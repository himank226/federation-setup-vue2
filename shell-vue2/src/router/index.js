import Vue from "vue";
import VueRouter from "vue-router";
import UserListRemote from "../views/UserListRemote.vue";
import EditUserRemote from "../views/EditUserRemote.vue";

Vue.use(VueRouter);

const routes = [
  { path: "*", redirect: "/" },
  { path: "/", redirect: "/users-remote" },
  { path: "/users-remote", component: UserListRemote, name: "users-remote" },
  {
    path: "/edit-user-remote",
    name: "edit-user-remote",
    component: EditUserRemote,
  },
];

export default new VueRouter({
  mode: "history",
  routes,
});
