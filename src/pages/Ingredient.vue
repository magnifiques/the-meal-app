<template>
  <div class="m-6">
    <div v-if="isLoading">
      <BaseLoader />
    </div>

    <div v-else-if="result.length > 0">
      <h1 class="pt-8 font-semibold text-2xl uppercase text-center">
        Meals for {{ ingredient }}
      </h1>
      <ul
        class="grid p-8 gap-8 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
        Meal does not exist!
      </h3>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import BaseLoader from "../ui/BaseLoader.vue";
import MealItem from "../components/MealItem.vue";
import store from "../store/index";
const route = useRoute();

const ingredient = route.params.ingredient;

const isLoading = ref(false);
const error = ref(null);
const result = computed(() => store.getters["mealsByIngredients"]);

onMounted(() => {
  searchMealByIngredient();
});

async function searchMealByIngredient() {
  isLoading.value = true;
  try {
    await store.dispatch("searchByIngredients", ingredient);
  } catch (err) {
    error.value = err || "Something Went Wrong!";
  }
  isLoading.value = false;
}
</script>
