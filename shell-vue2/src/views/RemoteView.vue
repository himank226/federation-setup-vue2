<template>
  <!-- Render the RemoteMount component dynamically with current scope and container ID -->
  <RemoteMount :key="scope" :scope="scope" :container-id="containerId" />
</template>

<script>
import RemoteMount from "../components/RemoteMount.vue";

export default {
  name: "RemoteView",
  components: { RemoteMount },
  computed: {
    scope() {
      return this.$route.meta?.scope || "";
    },
    containerId() {
      const id = this.$route.name + "-container";
      return id;
    },
  },
};
</script>
