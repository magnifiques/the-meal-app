import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes";
import store from "./store/index";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faTrash } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faTrash);

const app = createApp(App);

app.use(router);

app.use(store);
app.use(ToastPlugin);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
