import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(Antd);

import "bootstrap-icons/font/bootstrap-icons.css";
import "ant-design-vue/dist/reset.css";
// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import {
  faPlaneDeparture,
  faReply,
  faEye,
  faUserGroup,
  faLocationDot,
  faCalendarDays,
  faCircleUser,
  faCamera,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faPlaneDeparture,
  faReply,
  faEye,
  faUserGroup,
  faLocationDot,
  faCalendarDays,
  faCircleUser,
  faCamera,
  faXmark
);

app.component("font-awesome-icon", FontAwesomeIcon);

router.isReady().then(() => {
  app.mount("#app");
});
