import { createApp, App as VueApp } from "vue";
import App from "@/components/List.vue";

type MountOptions = {
  store?: unknown;
  router?: unknown;
  i18n?: unknown;
};

let app: VueApp<Element> | null = null;

/**
 * Mounts the Vue 3 application to the given element.
 */
export function mount(el: string | Element, options?: MountOptions) {
  console.log(`[DEBUG] Mounting app on element:`, el);
  console.log(`[DEBUG] Mount options:`, options);

  app = createApp(App);

  if (options?.store) {
    console.log("[DEBUG] Providing store");
    app.provide("store", options.store);
  }
  if (options?.router) {
    console.log("[DEBUG] Providing router");
    app.provide("router", options.router);
  }
  if (options?.i18n) {
    console.log("[DEBUG] Providing i18n");
    app.provide("i18n", options.i18n);
  }

  app.mount(el);
  console.log("[DEBUG] App mounted successfully");
}

/**
 * Cleanly unmounts the Vue 3 application.
 */
export function unmount() {
  if (app) {
    console.log("[DEBUG] Unmounting app");
    app.unmount();
    app = null;
    console.log("[DEBUG] App unmounted");
  } else {
    console.log("[DEBUG] No app instance to unmount");
  }
}
