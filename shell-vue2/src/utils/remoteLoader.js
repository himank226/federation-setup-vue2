import store from "../store/store";
import i18n from "../translation/i18n";

export async function mountVue3Component(scope, module, selector) {
  // 1. Initialize sharing
  await __webpack_init_sharing__("default");

  const container = window[scope];
  if (!container) {
    throw new Error(`Remote scope "${scope}" not found on window.`);
  }

  await container.init(__webpack_share_scopes__.default);

  // 2. Get the component module
  const factory = await container.get(module);
  const component = factory().default || factory();

  if (!component) {
    throw new Error(`Module "${module}" not found in scope "${scope}"`);
  }

  // 3. Load Vue
  const vue = await import("user_app_vue3/vue"); // Shared Vue instance
  const app = vue.createApp(component);

  // 4. Inject store and i18n
  app.provide("store", store);
  app.provide("i18n", i18n);

  // 5. Mount the component
  app.mount(selector);
}
