<template>
  <div>
    <h1>Shell App (Vue 2)</h1>

    <!-- User List Component -->
    <div v-if="UserListComponent" id="user-app-vue3-container"></div>
    <div v-else>Loading User List...</div>

    <!-- Edit Component -->
    <div
      v-if="EditComponent"
      id="edit-user-app-vue3-container"
      style="margin-top: 20px"
    ></div>
    <div v-else>Loading Edit Component...</div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      UserListComponent: null,
      EditComponent: null,
    };
  },
  created() {
    this.loadUserListComponent();
    this.loadEditComponent();
  },
  methods: {
    loadUserListComponent() {
      import("user_app_vue3/List")
        .then((module) => {
          const component = module.default || module.List;
          if (component) {
            this.UserListComponent = component;
            this.mountVue3Component(component, "#user-app-vue3-container");
          }
        })
        .catch((err) => console.error("Error loading UserList:", err));
    },

    loadEditComponent() {
      import("edit_user_app_vue3/Edit")
        .then((module) => {
          const component = module.default || module.Edit;
          if (component) {
            this.EditComponent = component;
            this.mountVue3Component(component, "#edit-user-app-vue3-container");
          }
        })
        .catch((err) => console.error("Error loading Edit component:", err));
    },

    mountVue3Component(component, selector) {
      import("user_app_vue3/vue")
        .then((vue) => {
          if (vue?.createApp) {
            const app = vue.createApp(component);
            app.mount(selector);
          } else {
            console.error("Vue 3 not loaded correctly.");
          }
        })
        .catch((err) => console.error("Error loading Vue 3:", err));
    },
  },
};
</script>
