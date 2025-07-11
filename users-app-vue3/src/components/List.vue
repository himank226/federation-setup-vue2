<template>
  <div>
    <h1>user</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name_en }} - {{ user.email }}
        <button @click="goToEdit(user.id)">edit</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";

interface User {
  id: number;
  name_en: string;
  name_hi: string;
  email: string;
}

export default defineComponent({
  name: "UserListRemote",
  setup() {
    const router = inject("router");
    const store = inject("store");

    const users = ref<User[]>(store?.state.users ?? []);

    const goToEdit = (userId: number) => {
      if (router) {
        router.push({ name: "edit-user-remote", params: { userId } });
      } else {
        console.error("Router not found in remote app");
      }
    };

    return {
      goToEdit,
      users,
    };
  },
});
</script>

<style scoped>
button {
  padding: 8px 12px;
  margin-top: 10px;
}

button[type="submit"] {
  background-color: #4caf50;
  color: white;
}

button[type="button"] {
  background-color: #f44336;
  color: white;
}
</style>
