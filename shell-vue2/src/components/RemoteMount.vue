<template>
  <div :id="containerId"></div>
</template>

<script>
export default {
  props: {
    scope: String,
    containerId: String,
  },
  async mounted() {
    await this.loadComponent();
  },
  methods: {
    async loadComponent() {
      try {
        const vue = await import("user_app_vue3/vue");

        if (!vue?.createApp) {
          console.error("Vue 3 is not available.");
          return;
        }

        const module = await (this.scope === "user_app_vue3/List"
          ? import("user_app_vue3/List")
          : this.scope === "edit_user_app_vue3/Edit"
          ? import("edit_user_app_vue3/Edit")
          : Promise.reject(new Error("Unknown scope")));

        const component = module.default || module;
        const app = vue.createApp(component);

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
      }
    },
  },
};
</script>
