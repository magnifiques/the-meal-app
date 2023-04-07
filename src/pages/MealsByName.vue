<template>
  <div>
    <div class="flex flex-col p-8">
      <input
        type="text"
        class="rounded border-2 border-red-200 w-full p-3"
        placeholder="Search for Meals"
        v-model="meal"
        @change="searchMeal"
      />
    </div>

    <div v-if="isLoading">
      <BaseLoader />
    </div>

    <ul
      v-else-if="result"
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

    <div v-else>
      <h3 class="text-center mt-12 text-2xl font-extrabold text-red-500">
        Meal does not exist!
      </h3>
    </div>
  </div>
</template>

<script setup>
import BaseLoader from "../ui/BaseLoader.vue";
import MealItem from "../components/MealItem.vue";
import { ref, computed, watch, onMounted } from "vue";
import store from "../store/index";
import { useRoute } from "vue-router";

const route = useRoute();

const meal = ref("");
const error = ref(null);
let result = computed(() => store.getters["meals"]);
const isLoading = ref(false);

async function searchMeal() {
  isLoading.value = true;
  try {
    await store.dispatch("searchByName", meal.value);
  } catch (err) {
    error.value = err || "Something Went Wrong!";
  }
  isLoading.value = false;
}

onMounted(() => {
  meal.value = route.params.name;
  if (meal.value) {
    searchMeal();
  }
});
</script>
