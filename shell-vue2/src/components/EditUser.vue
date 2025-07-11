<template>
  <div>
    <h2>{{ $t("editUserTitle") }}</h2>
    <form @submit.prevent="saveUser">
      <div>
        <label>{{ $t("name") }}:</label>
        <input v-model="localizedName" />
      </div>
      <div>
        <label>{{ $t("email") }}:</label>
        <input v-model="editedUser.email" />
      </div>
      <button type="submit">{{ $t("save") }}</button>
    </form>
  </div>
</template>

<script>
import store from "../store/store";

export default {
  name: "EditUser",
  data() {
    return {
      editedUser: null,
    };
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale;
    },
    localizedName: {
      get() {
        if (!this.editedUser) return "";
        return this.currentLocale === "hi"
          ? this.editedUser.name_hi || ""
          : this.editedUser.name_en || "";
      },
      set(value) {
        if (!this.editedUser) return;
        if (this.currentLocale === "hi") {
          this.editedUser.name_hi = value;
        } else {
          this.editedUser.name_en = value;
        }
      },
    },
  },
  created() {
    const userId = parseInt(this.$route.query.id);
    const user = store.state.users.find((u) => u.id === userId);
    if (user) {
      this.editedUser = { ...user };
      // Initialize missing localized fields to empty string
      if (!this.editedUser.name_en) this.editedUser.name_en = "";
      if (!this.editedUser.name_hi) this.editedUser.name_hi = "";
    } else {
      this.editedUser = { id: null, name_en: "", name_hi: "", email: "" };
    }
  },
  methods: {
    saveUser() {
      const index = store.state.users.findIndex(
        (u) => u.id === this.editedUser.id
      );
      if (index !== -1) {
        // Instead of splice, use the store method:
        store.updateUser(this.editedUser);
        alert(this.$t("userUpdated"));
      }
    },
  },
};
</script>
