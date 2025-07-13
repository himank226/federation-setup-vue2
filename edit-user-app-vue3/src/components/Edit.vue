<template>
  <h2>
    {{ translations.editUserTitle }}
  </h2>
  <div class="form-container">
    <form v-if="user.id !== 0" @submit.prevent="saveUser" class="form">
      <div
        v-for="(label, field) in fieldLabels"
        :key="field"
        class="form-group"
      >
        <label :for="field">{{ translations[label] }}</label>
        <input
          v-if="field !== 'message'"
          :id="field"
          type="text"
          :value="user[field]"
          @input="onInput(field, $event)"
        />
        <textarea
          v-else
          :id="field"
          :value="user[field]"
          @input="onInput(field, $event)"
        ></textarea>
      </div>

      <div class="form-group">
        <button type="submit">{{ translations.submit }}</button>
      </div>
    </form>

    <p v-else>{{ translations.userNotFound }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, computed, watchEffect } from "vue";
import type { User, Store, Router, I18n } from "../types/edit.types";

export default defineComponent({
  name: "EditUserRemote",

  setup() {
    const store = inject<Store>("store");
    const router = inject<Router>("router");
    const i18n = inject<I18n>("i18n");

    if (!store || !router || !i18n) throw new Error("Dependencies missing");

    const user = reactive<User>({
      id: 0,
      name: "",
      email: "",
      label: "",
      message: "",
    });

    watchEffect(() => {
      const id = Number(router.currentRoute.query?.id);
      const found = store.state.users.find((u) => u.id === id);

      if (found) Object.assign(user, found);
      else {
        user.id = 0;
        user.name = "";
        user.email = "";
        user.label = "";
        user.message = "";
      }
    });

    const translations = computed(
      () =>
        ({
          name: i18n.t("name"),
          email: i18n.t("email"),
          label: i18n.t("label"),
          message: i18n.t("message"),
          submit: i18n.t("submit"),
          userNotFound: i18n.t("userNotFound"),
          userUpdated: i18n.t("userUpdated"),
          editUserTitle: i18n.t("editUserTitle"),
        } as any)
    );

    // Typed event handler for input events
    function onInput<K extends keyof User>(field: K, e: Event) {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      const inputValue = target.value;
      user[field] = inputValue as User[K]; // assuming string fields only here
    }

    const saveUser = () => {
      store.updateUser({ ...user });
      alert(translations.value.userUpdated);
      router.push({ name: "users" });
    };

    const fieldLabels = computed(() => ({
      name: "name",
      email: "email",
      label: "label",
      message: "message",
    }));

    return {
      user,
      translations,
      onInput,
      saveUser,
      fieldLabels,
    };
  },
});
</script>

<style>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.form {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  min-height: 100px;
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
