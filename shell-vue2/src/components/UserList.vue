<template>
  <div>
    <h2>{{ $t("users") }}</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ getUserName(user) }} - {{ user.email }}
        |
        <router-link :to="`/edit-user?id=${user.id}`">{{
          $t("edit")
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import store from "../store/store"; // adjust path as needed

export default {
  name: "UserList",
  data() {
    return {
      store,
    };
  },
  computed: {
    users() {
      return this.store.state.users;
    },
  },
  methods: {
    getUserName(user) {
      return this.$i18n.locale === "hi" ? user.name_hi : user.name_en;
    },
  },
};
</script>
