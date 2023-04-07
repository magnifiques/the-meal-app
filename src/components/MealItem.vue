<template>
  <li
    class="grid gap-y-1 justify-items-center bg-yellow-50 items-center rounded-xl shadow-xl"
  >
    <img :src="src" :alt="name" class="rounded-t-xl h-56 w-full object-cover" />
    <h3 class="text-xl text-center font-bold p-5">
      {{ name }}
    </h3>
    <h3 class="text-xl font-bold py-5" v-if="mealType">
      Cuisine: {{ mealType }}
    </h3>
    <!-- <div class="flex flex-row items-center m-4"> -->
    <!-- <div class="m-4 w-full"> -->
    <router-link
      class="m-4"
      :to="{ name: 'mealDetails', params: { id: mealId } }"
    >
      <button
        class="font-semibold p-3 mx-3 rounded-lg border-2 shadow-md bg-sky-300 transition-all duration-100 ease-in hover:scale-105"
      >
        Details
      </button>
    </router-link>
    <!-- <button
        @click="addBookMark"
        :disabled="disabled.length > 0"
        class="font-semibold p-3 mx-3 rounded-lg border-2 shadow-md bg-pink-400 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-100 ease-in hover:scale-105"
      >
        <span v-if="disabled.length > 0">Bookmarked!</span>
        <span v-else>Bookmark</span>
      </button> -->
    <!-- </div> -->
  </li>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
// import store from "../store/index";
// import { useToast } from "vue-toast-notification";

const props = defineProps({
  name: String,
  src: String,
  mealId: String,
  mealType: String,
});

const email = ref("");
// const toast = useToast();
// const userMeals = computed(() => store.getters["userMeals"]).value;

// const disabled = computed(() =>
//   userMeals.filter((meal) => meal.idMeal === props.mealId)
// );

onMounted(() => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  email.value = userData.email;
});

// async function addBookMark() {
//   try {
//     await store.dispatch("bookMarkMeal", {
//       email: email.value,
//       mealId: props.mealId,
//     });
//     toast.open({
//       message: "Successfully Bookmarked!",
//       position: "top",
//       dismissible: false,
//       type: "success",
//     });
//   } catch (error) {
//     console.log(error);
//     toast.open({
//       message: "Something Went Wrong!",
//       position: "top",
//       dismissible: false,
//       type: "error",
//     });
//   }
// }
</script>
