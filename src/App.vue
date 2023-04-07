<script setup></script>

<template>
  <div class="h-full text-lg">
    <navbar v-if="isLogged" />

    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import { computed, watch } from "vue";
import store from "./store/index";
import { useRouter } from "vue-router";

const router = useRouter();

store.dispatch("autoLogIn");

const isLogged = computed(() => {
  return store.getters["isAuthenticated"];
});

watch(isLogged, (currentValue, oldValue) => {
  if (!currentValue) {
    router.push("/auth");
  }
});
</script>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3 ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
