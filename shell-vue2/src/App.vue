<template>
  <div>
    <h1>Shell App (Vue 2)</h1>

    <nav>
      <button @click="changeLanguage('en')">English</button>
      <button @click="changeLanguage('hi')">हिन्दी</button>
    </nav>

    <router-view />
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

  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      window.dispatchEvent(new CustomEvent("locale-changed", { detail: lang }));
    },
  },
};
</script>
