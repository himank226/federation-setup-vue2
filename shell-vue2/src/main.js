import Vue from "vue";
import App from "./App.vue";

Vue.config.ignoredElements = ["user-app", "edit-user-app"];

async function bootstrap() {
  // Load and register remote custom elements
  await import("user_app/List");
  await import("edit_user_app/Edit");

  // Mount shell app
  new Vue({
    render: (h) => h(App),
  }).$mount("#app");
}

bootstrap().catch((err) => {
  document.body.innerHTML = `<h2>Error loading remote component</h2><pre>${err}</pre>`;
});
