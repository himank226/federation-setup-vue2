<template>
  <div>
    <Spinner v-if="isLoading" />

    <div v-if="error" class="error-message">
      <p>Error loading remote app. Please try again later.</p>
    </div>

    <div :id="containerId" v-show="!isLoading && !error"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import Spinner from "./Spinner.vue";
import { remoteApps } from "../../remoteConfig"; // remote config with { scope, loader }

const props = defineProps({
  scope: String,
  containerId: String,
});

const isLoading = ref(false);
const error = ref(false);

const instance = getCurrentInstance();

async function loadRemote() {
  isLoading.value = true;
  error.value = false;

  try {
    // Find remote config by scope
    const appConfig = remoteApps.find((app) => app.scope === props.scope);
    if (!appConfig) {
      throw new Error(`Unknown scope: ${props.scope}`);
    }

    // Dynamically import the exposed mount method from remote
    const remoteMountModule = await appConfig.loader(); // e.g. import("remoteApp/mount")
    if (!remoteMountModule?.mount) {
      throw new Error("Remote app does not expose a mount method");
    }

    const { proxy } = instance;
    const { $store: store, $router: router, $i18n: i18n } = proxy.$root || {};

    // Mount the remote app into the container
    remoteMountModule.mount(`#${props.containerId}`, { store, router, i18n });
  } catch (e) {
    console.error(`Failed to load remote app (${props.scope}):`, e);
    error.value = true;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadRemote();
});
</script>

<style scoped>
.error-message {
  color: red;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
}
</style>
