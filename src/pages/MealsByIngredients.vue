<template>
  <div>
    <div class="flex flex-col p-8">
      <input
        type="text"
        class="rounded border-2 border-red-200 w-full p-3"
        placeholder="Search for Ingredients"
        v-model="searchIng"
      />
    </div>

    <div v-if="isLoading">
      <BaseLoader />
    </div>
    <ul
      v-else
      class="grid gap-8 lg:p-12 justify-items-center sm:text-center lg:grid-cols-2"
    >
      <li
        class="bg-white w-1/2 px-8 py-4 shadow-xl rounded-lg"
        v-for="meal in computedResult"
      >
        <router-link
          :to="{
            name: 'byIngredient',
            params: { ingredient: meal.strIngredient },
          }"
        >
          {{ meal.strIngredient }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import BaseLoader from "../ui/BaseLoader.vue";
import { ref, computed, onMounted } from "vue";

const searchIng = ref("");

const isLoading = ref(false);
const error = ref(null);

const result = ref([]);

const computedResult = computed(() => {
  if (!searchIng.value) return result.value;
  else {
    return result.value.filter((ingredient) => {
      return ingredient.strIngredient
        .toLowerCase()
        .includes(searchIng.value.toLowerCase());
    });
  }
});

async function searchMeal() {
  isLoading.value = true;
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    const responseData = await response.json();
    result.value = responseData.meals;
  } catch (err) {
    error.value = err || "Something Went Wrong!";
  }
  isLoading.value = false;
}

onMounted(() => {
  searchMeal();
});
</script>
