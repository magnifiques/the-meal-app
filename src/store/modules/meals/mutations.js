export default {
  setMeals(state, payload) {
    state.meals = payload;
  },
  setMealsByLetter(state, payload) {
    state.mealsByLetter = payload;
  },
  setMealByIngredients(state, payload) {
    state.mealsByIngredients = payload;
  },
  setRandomMeals(state, payload) {
    state.randomMeals = payload;
  },
  setUserMeals(state, payload) {
    state.userMeals = payload;
  },
};
