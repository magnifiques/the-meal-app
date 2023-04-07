<template>
  <div class="flex flex-col p-8">
    <div v-if="isLoading">
      <BaseLoader />
    </div>

    <div v-else-if="result.length > 0">
      <h1
        class="pt-8 font-semibold text-2xl uppercase text-center lg:text-left"
      >
        Your Bookmarked Recipes
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
        No Meals found! Maybe start bookmarking some recipes.
      </h3>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, watch } from "vue";
import BaseLoader from "../ui/BaseLoader.vue";
import MealItem from "../components/MealItem.vue";
import store from "../store/index";

const isLoading = ref(false);

const result = computed(() => store.getters["userMeals"]);

onMounted(() => {
  getMealIds();
});

async function getMealIds() {
  isLoading.value = true;
  try {
    await store.dispatch("getMealIds");
    await store.dispatch("getUserMeals");
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
}
</script>
