<template>
  <div>
    <Spinner v-if="isLoading" />

    <div v-if="error" class="error-message">
      <p>Error loading component. Please try again later.</p>
    </div>

    <div :id="containerId" v-show="!isLoading && !error"></div>
  </div>
</template>

<script>
import { remoteApps } from "../../remoteConfig";
import Spinner from "./Spinner.vue";

export default {
  components: {
    Spinner,
  },
  props: {
    scope: String,
    containerId: String,
  },
  data() {
    return {
      isLoading: false,
      error: false,
    };
  },
  async mounted() {
    await this.loadComponent();
  },
  methods: {
    /**
     * Dynamically loads and mounts a remote Vue 3 component
     * using the configuration defined in remoteApps.
     */
    async loadComponent() {
      this.isLoading = true;
      this.error = false;

      try {
        const vue = await import("user_app_vue3/vue");
        if (!vue?.createApp) {
          this.error = true;
          return;
        }

        // Find the matching remote app config based on scope
        const appConfig = remoteApps.find((app) => app.scope === this.scope);

        if (!appConfig) {
          throw new Error(`Unknown scope: ${this.scope}`);
        }

        const module = await appConfig.loader();
        const component = module.default || module;
        const app = vue.createApp(component);

        // Provide global context from Vue 2 root
        const { $store: store, $i18n: i18n, $router: router } = this.$root;
        app.provide("store", store);
        app.provide("i18n", i18n);
        app.provide("router", router);

        app.mount(`#${this.containerId}`);
      } catch (err) {
        console.error(
          `Failed to load component for scope "${this.scope}":`,
          err
        );
        this.error = true;
      } finally {
        this.isLoading = false;
      }
    },
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
