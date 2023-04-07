<template>
  <div
    class="flex flex-col w-2/4 lg:w-4/5 items-center justify-center m-auto mt-12 mb-12 p-8 shadow-lg rounded-lg bg-amber-200"
  >
    <h3 class="text-2xl lg:text-3xl">Select the letter</h3>
    <div
      class="flex flex-col text-2xl lg:flex-row items-center justify-center gap-4 mt-12 lg:text-3xl text-violet-700"
    >
      <router-link
        :to="{ name: 'byLetter', params: { letter } }"
        v-for="letter of letters"
        >{{ letter }}</router-link
      >
    </div>
  </div>
</template>

<script setup>
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
</script>
