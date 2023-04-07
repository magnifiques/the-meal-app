export default {
  async searchByName(context, query) {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_the_meal_db_api
        }/api/json/v1/1/search.php?s=${query}`
      );
      const responseData = await response.json();
      context.commit("setMeals", responseData.meals);
    } catch (error) {
      throw new Error(error || "Something Went Wrong!");
    }
  },

  async searchByLetter(context, query) {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_the_meal_db_api
        }/api/json/v1/1/search.php?f=${query}`
      );
      const responseData = await response.json();
      context.commit("setMealsByLetter", responseData.meals);
    } catch (error) {
      throw new Error(error || "Something Went Wrong!");
    }
  },

  async searchByIngredients(context, query) {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_the_meal_db_api
        }/api/json/v1/1/filter.php?i=${query}`
      );

      const responseData = await response.json();
      context.commit("setMealByIngredients", responseData.meals);
    } catch (error) {
      throw new Error(error || "Something Went Wrong!");
    }
  },

  async getRandomMeals(context) {
    try {
      const result = [];
      for (let i = 0; i < 4; i++) {
        const response = await fetch(
          `${import.meta.env.VITE_the_meal_db_api}/api/json/v1/1/random.php`
        );
        const responseData = await response.json();
        result.push(responseData.meals[0]);
      }
      context.commit("setRandomMeals", result);
    } catch (error) {
      throw new Error(error || "Something Went Wrong!");
    }
  },

  async getUserMeals(context) {
    try {
      const mealIds = context.getters.mealIds;

      const userMeals = [];

      for (let i = 0; i < mealIds.length; i++) {
        const response = await fetch(
          `${import.meta.env.VITE_the_meal_db_api}/api/json/v1/1/lookup.php?i=${
            mealIds[i]
          }`
        );
        if (!response.ok) throw new Error("Something Went Wrong");

        const responseData = await response.json();

        userMeals.push(responseData.meals[0]);
      }

      context.commit("setUserMeals", userMeals);

      return { status: true };
    } catch (error) {
      throw new Error(error || "Something Went Wrong!");
    }
  },
};
