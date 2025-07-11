import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  en: {
    users: "Users",
    edit: "Edit",
    name: "Name",
    email: "Email",
    save: "Save",
    editUserTitle: "Edit User",
    userUpdated: "User updated!",
  },
  hi: {
    users: "उपयोगकर्ता",
    edit: "संपादित करें",
    name: "नाम",
    email: "ईमेल",
    save: "सहेजें",
    editUserTitle: "उपयोगकर्ता संपादित करें",
    userUpdated: "उपयोगकर्ता अपडेट हो गया!",
  },
};

export default new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});
