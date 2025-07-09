import { defineCustomElement } from "vue";
import List from "./components/List.vue";

const CustomElement = defineCustomElement(List);
customElements.define("user-app", CustomElement);
