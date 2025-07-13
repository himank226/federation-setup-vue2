<template>
  <div>
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
        <button @click="goToEdit(user.id)">{{ editText }}</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from "vue";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Store {
  state: {
    users: User[];
  };
}

interface Router {
  push(location: { name: string; query: { id: number } }): void;
}

interface I18n {
  t(key: string): string;
  locale: string;
}

export default defineComponent({
  name: "UserListRemote",
  setup() {
    const store = inject<Store>("store");
    const router = inject<Router>("router");
    const i18n = inject<I18n>("i18n");

    if (!store || !router || !i18n) {
      throw new Error("Dependencies not provided");
    }

    const users = computed(() => store.state.users);
    const title = ref("");
    const editText = ref("");

    const updateTexts = () => {
      title.value = i18n.t("users");
      editText.value = i18n.t("edit");
    };

    const onLocaleChanged = (event: Event) => {
      if ("detail" in event) {
        i18n.locale = (event as CustomEvent).detail;
        updateTexts();
      }
    };

    onMounted(() => {
      updateTexts();
      window.addEventListener("locale-changed", onLocaleChanged);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("locale-changed", onLocaleChanged);
    });

    const goToEdit = (id: number) => {
      router.push({ name: "edit-user-remote", query: { id } });
    };

    return {
      title,
      editText,
      users,
      goToEdit,
    };
  },
});
</script>
