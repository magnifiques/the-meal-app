<template>
  <header
    class="flex flex-col lg:flex-row items-center px-8 py-6 justify-between bg-white shadow-md"
  >
    <router-link class="text-3xl font-bold" :to="{ name: 'Home' }"
      >Home</router-link
    >

    <div
      class="flex flex-col gap-y-4 items-center justify-center mt-4 lg:mt-0 lg:flex-row lg:p-0"
    >
      <router-link
        class="px-2 text-purple-600 font-semibold lg:font-normal lg:text-black hover:text-purple-600"
        :to="{ name: 'byName' }"
        >Search Meals</router-link
      >
      <router-link
        class="px-2 text-green-600 font-semibold lg:font-normal lg:text-black hover:text-green-600"
        :to="{ name: 'byIngredients' }"
        >Search By Ingredients</router-link
      >
      <router-link
        class="px-2 text-blue-600 font-semibold lg:font-normal lg:text-black cursor-pointer hover:text-blue-600"
        :to="{ name: 'byLetters' }"
        >Search By Letter</router-link
      >
      <router-link
        class="px-2 text-red-600 font-semibold lg:font-normal lg:text-black hover:text-red-600"
        :to="{ name: 'myRecipes' }"
        >My Recipes</router-link
      >

      <a
        class="px-2 cursor-pointer font-semibold lg:font-normal text-fuchsia-600 lg:text-black hover:text-fuchsia-600"
        @click="setLogOut"
        >Log Out</a
      >
    </div>
  </header>
</template>

<script setup>
import store from "../store";
import { useRouter } from "vue-router";

const router = useRouter();

function setLogOut() {
  store.dispatch("logout");
  router.push("/auth");
}
</script>
