<template>
  <div :id="containerId"></div>
</template>

<script>
export default {
  props: {
    scope: String,
    containerId: String,
  },
  mounted() {
    this.loadComponent();
  },
  methods: {
    loadComponent() {
      import("user_app_vue3/vue") // Dynamically import Vue 3
        .then((vue) => {
          if (!vue?.createApp) {
            console.error("Vue 3 is not available.");
            return;
          }

          // Load the remote app component based on scope
          if (this.scope === "user_app_vue3/List") {
            import("user_app_vue3/List") // Dynamically import the remote User List component
              .then((module) => {
                const component = module.default || module;
                const app = vue.createApp(component);

                // Get the store, i18n, and router instance from the parent shell app
                const store = this.$root.$store;
                const i18n = this.$root.$i18n;
                const router = this.$root.$router; // Provide the router instance

                app.provide("store", store);
                app.provide("i18n", i18n);
                app.provide("router", router); // Provide router to remote component

                // Mount the remote component to the container
                app.mount(`#${this.containerId}`);
              })
              .catch((err) =>
                console.error(`Failed to load ${this.scope}:`, err)
              );
          } else if (this.scope === "edit_user_app_vue3/Edit") {
            import("edit_user_app_vue3/Edit") // Dynamically import the remote Edit User component
              .then((module) => {
                const component = module.default || module;
                const app = vue.createApp(component);

                // Get the store, i18n, and router instance from the parent shell app
                const store = this.$root.$store;
                const i18n = this.$root.$i18n;
                const router = this.$root.$router; // Provide the router instance

                app.provide("store", store);
                app.provide("i18n", i18n);
                app.provide("router", router); // Provide router to remote component

                // Mount the remote component to the container
                app.mount(`#${this.containerId}`);
              })
              .catch((err) =>
                console.error(`Failed to load ${this.scope}:`, err)
              );
          } else {
            console.error(`Unknown scope: ${this.scope}`);
          }
        })
        .catch((err) => console.error("Failed to load Vue 3:", err));
    },
  },
};
</script>
