<template>
  <div class="container">
    <video id="desk-view" autoplay muted loop>
      <source src="/desk-video.mp4" />
    </video>

    <video id="mobile-view" autoplay muted loop>
      <source src="/mobile-view.mp4" />
    </video>

    <div class="grid justify-items-center gap-y-4 p-8">
      <h1 class="font-rubik text-5xl text-white">
        Discover Your favorite Meals
      </h1>

      <form
        class="font-roboto grid lg:grid-cols-2 mt-12 py-8 px-4 lg:p-8 lg:first-letter:gap-2 shadow-xl rounded-xl bg-violet-400 bg-opacity-50 justify-items-center xl:text-lg"
        @submit.prevent="submitForm"
      >
        <h2 class="font-rubik col-span-2 text-xl lg:text-3xl mb-8">
          Why don't we sign in first?
        </h2>
        <label
          class="col-span-2 lg:m-4 lg:text-2xl lg:col-span-1"
          v-if="!isUser"
          for="userName"
          >Name</label
        >
        <input
          v-if="!isUser"
          class="col-span-2 mb-2 lg:m-4 lg:col-span-1 rounded border-2 border-red-200"
          type="text"
          id="userName"
          v-model="userName"
        />

        <label
          class="col-span-2 mb-2 lg:m-4 lg:text-2xl lg:col-span-1"
          for="email"
          >Email</label
        >
        <input
          class="col-span-2 mb-2 lg:m-4 lg:col-span-1 rounded border-2 border-red-200"
          type="email"
          id="email"
          v-model="email"
        />

        <label
          class="col-span-2 mb-2 lg:m-4 lg:text-2xl lg:col-span-1"
          for="password"
          >Password</label
        >
        <input
          class="col-span-2 mb-2 lg:m-4 lg:col-span-1 rounded border-2 border-red-200"
          type="password"
          id="password"
          v-model="password"
        />

        <p class="col-span-2 mt-4 text-white font-bold" v-if="error">
          {{ error }}
        </p>
        <button
          v-if="!isUser"
          :disabled="
            userName.trim() === '' ||
            email.trim() === '' ||
            password.length <= 6
          "
          class="col-span-2 disabled:bg-gray-400 w-4/5 mt-4 text-white bg-blue-600 px-4 py-2 rounded-lg shadow-lg"
        >
          Sign Up
        </button>
        <button
          v-else
          :disabled="email.trim() === '' || password.length <= 6"
          class="col-span-2 disabled:bg-gray-400 w-4/5 mt-4 text-white bg-violet-600 px-4 py-2 rounded-lg shadow-lg"
        >
          Log In
        </button>

        <p
          class="col-span-2 lg:text-xl mt-8 lg:mt-4 text-white cursor-pointer"
          @click="toggleUser(true)"
          v-if="!isUser"
        >
          Already A User? Log in Instead!
        </p>
        <p
          class="col-span-2 lg:text-xl mt-8 lg:mt-4 text-white cursor-pointer"
          v-else
          @click="toggleUser(false)"
        >
          New User? Sign Up Instead!
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import store from "../store/index";
import { ref } from "vue";
import { useRouter } from "vue-router";

const userName = ref("");
const email = ref("");
const password = ref("");
const isUser = ref(false);
const error = ref(null);

const router = useRouter();

function toggleUser(value) {
  isUser.value = value;
  userName.value = "";
  email.value = "";
  password.value = "";
  error.value = "";
}

async function submitForm() {
  if (isUser.value) {
    try {
      const userData = {
        email: email.value,
        password: password.value,
      };

      await store.dispatch("login", userData);

      router.push("/");
    } catch (err) {
      error.value = err.message;
    }
  } else {
    try {
      const userData = {
        email: email.value,
        userName: userName.value,
        password: password.value,
      };
      await store.dispatch("signup", userData);
      router.push("/");
    } catch (err) {
      error.value = err.message;
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;

  background-color: rgba(0, 0, 0, 0.4);
}
.container video {
  position: absolute;
  z-index: -1;
  height: 100vh;
  width: 100%;
  object-fit: cover;
  opacity: 100;
}

#desk-view {
  display: block;
}

#mobile-view {
  display: none;
}

@media only screen and (max-width: 600px) {
  #desk-view {
    display: none;
  }

  #mobile-view {
    display: block;
  }
}
</style>
