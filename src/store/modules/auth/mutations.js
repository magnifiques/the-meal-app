export default {
  setUserData(state, payload) {
    state.userData = payload;
  },
  setIsAuthenticated(state, payload) {
    state.isAuthenticated = payload;
  },
  setMealIds(state, payload) {
    state.mealIds = payload;
  },
};
