import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

import Home from "../pages/Home.vue";

import MealsByName from "../pages/MealsByName.vue";

import MealsByLetters from "../pages/MealsByLetters.vue";
import Letter from "../pages/Letter.vue";

import MealsByIngredients from "../pages/MealsByIngredients.vue";
import Ingredient from "../pages/Ingredient.vue";

import MealDetails from "../pages/MealDetails.vue";
import Auth from "../pages/Auth.vue";
import MyRecipes from "../pages/MyRecipes.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/searchMeals/:name?",
      name: "byName",
      component: MealsByName,
    },
    {
      path: "/ingredients",
      name: "byIngredients",
      component: MealsByIngredients,
    },
    {
      path: "/ingredients/:ingredient",
      name: "byIngredient",
      component: Ingredient,
    },
    {
      path: "/letters",
      name: "byLetters",
      component: MealsByLetters,
    },
    {
      path: "/letters/:letter",
      name: "byLetter",
      component: Letter,
    },
    {
      path: "/meals/:id",
      name: "mealDetails",
      component: MealDetails,
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
    },
    {
      path: "/myRecipes",
      name: "myRecipes",
      component: MyRecipes,
    },
  ],
});

router.beforeEach(function (to, _2, next) {
  if (to.name !== "auth" && !store.getters["isAuthenticated"]) {
    next({ name: "auth" });
  } else next();
});

export default router;
