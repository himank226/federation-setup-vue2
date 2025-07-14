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
      // const moduleName = this.$route.meta.module || "./mount";  // Not needed here

      console.debug(
        `[DEBUG] Attempting to load remote app with scope: ${scope}`
      );

      const appConfig = remoteApps.find((app) => app.scope === scope);
      if (!appConfig) {
        throw new Error(`Unknown scope: ${scope}`);
      }

      console.debug("[DEBUG] Found remote app config:", appConfig);

      const remoteModule = await appConfig.loader(); // use loader from config

      console.debug("[DEBUG] Loaded remote module:", remoteModule);

      if (!remoteModule?.mount) {
        const exposedKeys = Object.keys(remoteModule || {});
        console.error("[DEBUG] Remote module keys:", exposedKeys);
        throw new Error("Remote module does not expose a mount method");
      }

      remoteModule.mount(this.$refs.container, {
        store: this.$store,
        router: this.$router,
        i18n: this.$i18n,
      });

      console.debug(
        `[DEBUG] Mounted remote app in container: #${this.containerId}`
      );
    } catch (err) {
      console.error(`[ERROR] Failed to load remote app:`, err);
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
