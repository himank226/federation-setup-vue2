<template>
  <div>
    <form v-if="user.id !== 0" @submit.prevent="saveUser">
      <div>
        <label for="name_en">{{ labelNameEn }}</label>
        <input id="name_en" :value="user.name" @input="updateUserNameEn" />
      </div>

      <div>
        <label for="email">{{ labelEmail }}</label>
        <input id="email" :value="user.email" @input="updateUserEmail" />
      </div>

      <button type="submit">{{ btnSave }}</button>
    </form>

    <p v-else>User Not Found</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  reactive,
  ref,
  watchEffect,
  onMounted,
  onBeforeUnmount,
} from "vue";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Store {
  state: { users: User[] };
  updateUser(user: User): void;
}

interface Router {
  currentRoute: {
    query: Record<string, any>;
  };
  push(location: { name: string }): void;
}

interface I18n {
  locale: string;
  t(key: string): string;
}

export default defineComponent({
  name: "EditUser",
  setup() {
    const store = inject<Store>("store");
    const router = inject<Router>("router");
    const i18n = inject<I18n>("i18n");

    if (!store || !router || !i18n) throw new Error("Dependency missing");

    const user = reactive<User>({ id: 0, name: "", email: "" });

    watchEffect(() => {
      const id = Number(router.currentRoute.query?.id);
      const found = store.state.users.find((u) => u.id === id);
      if (found) Object.assign(user, found);
      else user.id = 0;
    });

    const updateUserNameEn = (e: Event) => {
      user.name = (e.target as HTMLInputElement).value;
    };

    const updateUserEmail = (e: Event) => {
      user.email = (e.target as HTMLInputElement).value;
    };

    const saveUser = () => {
      store.updateUser({ ...user });
      alert("User details updated");
      router.push({ name: "users-remote" });
    };

    const labelNameEn = ref("");
    const labelEmail = ref("");
    const btnSave = ref("");

    const updateTexts = () => {
      labelNameEn.value = i18n.t("name") || "Name";
      labelEmail.value = i18n.t("email") || "Email";
      btnSave.value = i18n.t("save") || "Save";
    };

    watchEffect(() => {
      i18n.locale;
      updateTexts();
    });

    onMounted(() => {
      updateTexts();
      window.addEventListener("locale-changed", (e: Event) => {
        if ("detail" in e) {
          i18n.locale = (e as CustomEvent).detail;
          updateTexts();
        }
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener("locale-changed", updateTexts);
    });

    return {
      user,
      labelNameEn,
      labelEmail,
      btnSave,
      updateUserNameEn,
      updateUserEmail,
      saveUser,
    };
  },
});
</script>
