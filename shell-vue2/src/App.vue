<template>
  <div>
    <h1>Shell App (Vue 2)</h1>

    <nav>
      <!-- Local Routes -->
      <button @click="navigateToLocalUserList">Local User List</button> |
      <button @click="navigateToLocalEditUser">Local Edit User</button> |
      <button @click="navigateToRemoteUserList">Remote User List</button> |
      <button @click="navigateToRemoteEditUser">Remote Edit User</button>

      <br />

      <!-- Language Switcher -->
      <button @click="changeLanguage('en')">English</button>
      <button @click="changeLanguage('hi')">हिन्दी</button>
    </nav>

    <router-view />
  </div>
</template>

<script>
import store from "./store/store";

export default {
  name: "App",
  data() {
    return {
      UserListComponent: null,
      EditComponent: null,
    };
  },
  created() {
    // Provide the store globally for remote components
    this.$root.$options.provide = {
      store, // Make store available in child components
    };
  },
  methods: {
    // Navigate to local user list
    navigateToLocalUserList() {
      if (this.$router.currentRoute.path !== "/users") {
        this.$router.push("/users");
      }
    },

    // Navigate to local edit user page
    navigateToLocalEditUser() {
      if (this.$router.currentRoute.path !== "/edit-user") {
        this.$router.push("/edit-user");
      }
    },

    // Navigate to remote user list page
    navigateToRemoteUserList() {
      if (this.$router.currentRoute.path !== "/users-remote") {
        this.$router.push("/users-remote");
      }
    },

    // Navigate to remote edit user page
    navigateToRemoteEditUser() {
      if (this.$router.currentRoute.path !== "/edit-user-remote") {
        this.$router.push("/edit-user-remote");
      }
    },

    // Change language
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>
