import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export default {
  state() {
    return {
      userData: null,
      isAuthenticated: false,
      mealIds: [],
    };
  },
  actions,
  getters,
  mutations,
};
