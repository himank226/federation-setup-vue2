import { defineCustomElement } from "vue";
import Edit from "./components/Edit.vue";

const CustomElement = defineCustomElement(Edit);
customElements.define("edit-user-app", CustomElement);
