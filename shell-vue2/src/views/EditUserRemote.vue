<template>
  <div>
    <RemoteMount
      scope="edit_user_app_vue3/Edit"
      container-id="edit-user-container"
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
