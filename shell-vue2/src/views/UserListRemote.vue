<template>
  <div>
    <RemoteMount
      scope="user_app_vue3/List"
      container-id="user-list-container"
    />
  </div>
</template>

<script>
import RemoteMount from "../components/RemoteMount.vue";

export default {
  name: "UserListRemote",
  components: { RemoteMount },
};
</script>
