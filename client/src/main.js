import { createApp } from "vue";
import App from "./App.vue";
import router from "../src/router/router";
import store from "../src/store/index";

import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi", // This is already the default value - only for display purposes
  },
});

createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .use(ToastPlugin, {
    // One of the options
    position: "bottom-right",
  })
  .mount("#app");
