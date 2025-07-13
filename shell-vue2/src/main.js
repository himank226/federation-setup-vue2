import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./translation/i18n";
import store from "./store/store";

Vue.config.productionTip = false;

Vue.prototype.$store = store;
console.log("Webpack publicPath:", __webpack_require__.p);

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount("#app");
