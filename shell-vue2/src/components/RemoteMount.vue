<template>
  <div>
    <Spinner v-if="isLoading" />

    <div v-if="error" class="error-message">
      <p>Error loading remote app. Please try again later.</p>
    </div>

    <div :id="containerId" ref="container" v-show="!isLoading && !error"></div>
  </div>
</template>

<script>
import Spinner from "./Spinner.vue";
import { remoteApps } from "../../remoteConfig";

export default {
  name: "RemoteView",
  components: { Spinner },
  data() {
    return {
      isLoading: false,
      error: false,
      containerId: `remote-container-${Date.now()}`,
    };
  },
  async mounted() {
    this.isLoading = true;
    this.error = false;

    try {
      const scope = this.$route.meta.scope || "";

      const appConfig = remoteApps.find((app) => app.scope === scope);

      if (!appConfig) {
        throw new Error(`Unknown scope: ${scope}`);
      }

      const remoteModule = await appConfig.loader(); // use loader from config

      if (!remoteModule?.mount) {
        throw new Error("Remote module does not expose a mount method");
      }

      remoteModule.mount(this.$refs.container, {
        store: this.$store,
        router: this.$router,
        i18n: this.$i18n,
      });
    } catch (err) {
      this.error = true;
    } finally {
      this.isLoading = false;
    }
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
}
</style>
