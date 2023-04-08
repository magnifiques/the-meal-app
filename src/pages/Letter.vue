<template>
  <div class="mt-8">
    <div v-if="isLoading">
      <BaseLoader />
    </div>

    <ul
      v-else-if="result.length > 0"
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
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import BaseLoader from "../ui/BaseLoader.vue";
import MealItem from "../components/MealItem.vue";
import store from "../store/index";
const route = useRoute();

const letter = route.params.letter;

const isLoading = ref(false);
const error = ref(null);
const result = computed(() => store.getters["mealsByLetter"]);
onMounted(() => {
  searchMealByLetter();
});

async function searchMealByLetter() {
  isLoading.value = true;
  try {
    await store.dispatch("searchByLetter", letter);
  } catch (err) {
    error.value = err || "Something Went Wrong!";
  }
  isLoading.value = false;
}
</script>

<style></style>
