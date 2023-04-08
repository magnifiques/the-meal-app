<template>
  <div class="flex flex-col p-8">
    <div v-if="isLoading">
      <BaseLoader />
    </div>

    <div v-else-if="result.length > 0">
      <h1
        class="pt-8 font-semibold text-2xl uppercase text-center lg:text-left"
      >
        Hello, <span class="text-purple-700">{{ userName }}!</span> Nice to have
        you here.
      </h1>
      <h1 class="pt-8 font-semibold text-2xl uppercase text-center">
        Today's featured Meals
      </h1>
      <ul
        class="grid py-8 gap-8 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <MealItem
          v-for="meal in result"
          :key="meal.idMeal"
          :mealId="meal.idMeal"
          :name="meal.strMeal"
          :src="meal.strMealThumb"
          :mealType="meal.strArea"
          class="w-80"
        />
      </ul>
    </div>
    <div v-else>
      <h3 class="text-center mt-12 text-2xl font-extrabold text-red-500">
        It seems that the Meal Database is down right now! Please Try again
        later
      </h3>
    </div>
  </div>
</template>

<script setup>
import BaseLoader from "../ui/BaseLoader.vue";
import MealItem from "../components/MealItem.vue";
import { ref, onMounted, computed } from "vue";

import store from "../store/index";

const result = computed(() => store.getters["randomMeals"]);

const isLoading = ref(false);

const userName = ref("");

onMounted(() => {
  getRandomMeals();
  const userData = JSON.parse(localStorage.getItem("userData"));
  userName.value = userData.userName;
});

async function getRandomMeals() {
  try {
    isLoading.value = true;
    await store.dispatch("getRandomMeals");
  } catch (err) {
    console.log(err);
  }
  isLoading.value = false;
}
</script>
