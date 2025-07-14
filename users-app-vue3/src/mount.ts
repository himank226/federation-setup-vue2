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
  app = createApp(App);

  if (options?.store) app.provide("store", options.store);
  if (options?.router) app.provide("router", options.router);
  if (options?.i18n) app.provide("i18n", options.i18n);

  app.mount(el);
}

/**
 * Cleanly unmounts the Vue 3 application.
 */
export function unmount() {
  if (app) {
    app.unmount();
    app = null;
  }
}
