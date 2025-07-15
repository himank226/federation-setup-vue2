<template>
  <div>
    <h2>{{ translations.title }}</h2>
    <table>
      <thead>
        <tr>
          <th>{{ translations.id }}</th>
          <th>{{ translations.name }}</th>
          <th>{{ translations.email }}</th>
          <th>{{ translations.label }}</th>
          <th>{{ translations.message }}</th>
          <th>{{ translations.actions }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.label }}</td>
          <td>{{ user.message }}</td>
          <td>
            <button @click="goToEdit(user.id)">
              {{ translations.edit }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from "vue";
import type {
  User,
  Store,
  Router,
  I18n,
} from "../interfaces/list.interface.js";

export default defineComponent({
  name: "UserListRemote",

  setup() {
    const store = inject<Store>("store");
    const router = inject<Router>("router");
    const i18n = inject<I18n>("i18n");

    if (!store || !router || !i18n) {
      throw new Error("Dependencies not provided");
    }

    const users = computed<User[]>(() => store?.state?.users);

    const translations = computed(() => ({
      title: i18n.t("users"),
      id: i18n.t("id"),
      name: i18n.t("name"),
      email: i18n.t("email"),
      label: i18n.t("label"),
      message: i18n.t("message"),
      actions: i18n.t("actions"),
      edit: i18n.t("edit"),
    }));

    const goToEdit = (id: number) => {
      router.push({ name: "edit-user", query: { id } });
    };

    return {
      users,
      translations,
      goToEdit,
    };
  },
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #ddd;
  vertical-align: top;
}

button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  display: block;
}

button:hover {
  background-color: #0056b3;
}
</style>
