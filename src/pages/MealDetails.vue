<template>
  <div class="flex flex-col items-center m-6">
    <div v-if="isLoading">
      <BaseLoader />
    </div>
    <div v-else-if="meal.length === 0">
      <h3 class="text-center mt-12 text-2xl font-extrabold text-red-500">
        Meal does not exist!
      </h3>
    </div>
    <div v-else="meal" class="flex flex-col items-center m-6">
      <button
        @click="addBookMark"
        :disabled="disabled.length > 0"
        class="bg-red-500 mb-4 font-mono font-semibold text-xl text-white py-2 px-4 shadow-lg rounded-lg shadow-red-700 hover:bg-red-600 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed transition-all ease-in"
      >
        <span v-if="disabled.length > 0">Bookmarked!</span>
        <span v-else>Bookmark</span>
      </button>

      <h1 class="text-4xl font-extrabold mt-4">{{ meal.strMeal }}</h1>
      <div
        class="lg:text-2xl mt-12 grid lg:grid-cols-2 gap-4 lg:w-2/5 justify-items-center border shadow-lg rounded-lg bg-pink-200 border-pink-600 px-5 py-10"
      >
        <h2>
          Cuisine
          <span class="font-bold">{{ meal.strArea }}</span>
        </h2>

        <h2>
          Category:
          <span class="font-bold">{{ meal.strCategory }}</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 mt-4 justify-items-center">
        <img
          class="mt-8 text-center shadow-xl lg:h-5/6 rounded-lg"
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
        />
      </div>

      <div
        class="p-8 mt-8 lg:mt-4 shadow-lg rounded-tr-3xl bg-orange-200 lg:w-2/6"
      >
        <h4 class="lg:text-2xl text-center font-semibold pb-4">Ingredients:</h4>
        <ul v-for="(el, index) of new Array(50)">
          <li class="lg:text-xl" v-if="meal[`strIngredient${index + 1}`]">
            -
            <span class="font-semibold">{{
              meal[`strMeasure${index + 1}`]
            }}</span>
            {{ meal[`strIngredient${index + 1}`] }}
          </li>
        </ul>
      </div>

      <div class="lg:w-3/5 mt-12 bg-lime-200 p-4 rounded-xl shadow-lg">
        <h4 class="text-3xl font-semibold pb-4">Instructions:</h4>
        <p class="text-base lg:text-xl">{{ meal.strInstructions }}</p>
      </div>

      <div
        class="grid grid-cols-2 gap-4 items-center justify-items-center mt-12"
      >
        <a
          class="bg-red-600 px-4 py-2 shadow-lg text-white transition-all ease-in rounded-lg hover:bg-red-700"
          :href="meal.strYoutube"
          target="_blank"
          >Youtube</a
        >
        <a
          class="bg-green-600 px-4 py-2 shadow-lg text-white transition-all ease-in rounded-lg hover:bg-green-700"
          :href="meal.strSource"
          target="_blank"
          >Source</a
        >
      </div>

      <div
        class="flex items-center px-8 py-4 shadow-lg rounded-lg justify-center mt-12 gap-2 bg-indigo-200"
        v-if="tags.length > 0"
      >
        <h3 class="text-2xl font-serif">Tags:</h3>
        <ul class="flex flex-row">
          <li
            v-for="tag in tags"
            class="rounded-l-md rounded-r-xl mx-2 px-4 py-2 bg-yellow-500"
          >
            {{ tag }}
          </li>
        </ul>
      </div>

      <button
        @click="deleteBookmark"
        v-if="disabled.length > 0"
        class="bg-violet-500 mt-8 font-semibold text-white py-2 px-4 shadow-lg rounded-lg shadow-violet-700 hover:bg-violet-600 transition-all ease-in"
      >
        <span class="text-base lg:text-2xl"
          ><font-awesome-icon
            icon="fa-solid fa-trash"
            class="text-white px-2"
          />Remove Bookmark</span
        >
      </button>
    </div>
  </div>
</template>

<script setup>
import BaseLoader from "../ui/BaseLoader.vue";
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import store from "../store/index";

const route = useRoute();
const router = useRouter();

const mealId = route.params.id;

const userMeals = computed(() => store.getters["userMeals"]).value;

const disabled = computed(() =>
  userMeals.filter((meal) => meal.idMeal === mealId)
);

const toast = useToast();

const isLoading = ref(false);
const error = ref(null);
const meal = ref([]);
const tags = ref([]);

onMounted(() => {
  if (mealId) {
    searchById();
  } else {
    router.push("/");
  }
});

async function searchById() {
  isLoading.value = true;
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_the_meal_db_api
      }/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const responseData = await response.json();
    meal.value = responseData.meals[0];

    if (meal.value.strTags) {
      tags.value = meal.value.strTags.split(",");
    }
  } catch (err) {
    error.value = err || "Something Went Wrong!";
  }
  isLoading.value = false;
  console.log(meal.value);
}

async function addBookMark() {
  try {
    await store.dispatch("bookMarkMeal", {
      mealId,
    });
    toast.open({
      message: "Successfully Bookmarked!",
      position: "top",
      dismissible: false,
      type: "success",
    });
    router.push("/myRecipes");
  } catch (error) {
    console.log(error);
    toast.open({
      message: "Something Went Wrong!",
      position: "top",
      dismissible: false,
      type: "error",
    });
  }
}

async function deleteBookmark() {
  try {
    await store.dispatch("deleteBookmark", {
      mealId,
    });
    toast.open({
      message: "Successfully Removed!",
      position: "top",
      dismissible: false,
      type: "success",
    });
    router.push("/myRecipes");
  } catch (error) {
    console.log(error);
    toast.open({
      message: "Something Went Wrong!",
      position: "top",
      dismissible: false,
      type: "error",
    });
  }
}
</script>
