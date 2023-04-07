import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  state() {
    return {
      meals: [],
      mealsByLetter: [],
      mealsByIngredients: [],
      randomMeals: [],
      userMeals: [],
    };
  },
  actions,
  mutations,
  getters,
};
