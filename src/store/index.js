import { createStore } from "vuex";
import mealsModule from "./modules/meals";
import authModule from "./modules/auth";

const store = createStore({
  modules: {
    meals: mealsModule,
    auth: authModule,
  },
});

export default store;
