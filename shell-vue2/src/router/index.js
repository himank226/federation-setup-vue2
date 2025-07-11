// Shell App's Router Setup (router.js)
import Vue from "vue";
import VueRouter from "vue-router";

// Local Components
import UserList from "../components/UserList.vue";
import EditUser from "../components/EditUser.vue";

// Remote Components
import UserListRemote from "../views/UserListRemote.vue";
import EditUserRemote from "../views/EditUserRemote.vue";

Vue.use(VueRouter);

const routes = [
  // Local Routes
  { path: "/users", component: UserList },
  { path: "/edit-user/:userId", component: EditUser },

  // Remote Routes
  { path: "/users-remote", component: UserListRemote },
  {
    path: "/edit-user-remote/:userId",
    name: "edit-user-remote",
    component: EditUserRemote,
    props: true,
  }, // Ensure userId is passed as a prop
];

export default new VueRouter({
  mode: "history",
  routes,
});
