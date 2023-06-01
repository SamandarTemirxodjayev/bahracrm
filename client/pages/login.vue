<template>
  <div v-if="loading">
    <div class="flex items-center justify-center h-screen bg-gray-300">
      <div class="text-center">
        <h1 class="text-3xl font-bold mb-4">Loading...</h1>
        <div class="spinner"></div>
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded shadow-md">
      <h2 class="text-3xl font-bold mb-6 text-center">Kirish</h2>
      <div class="text-red-500 text-lg font-semibold">{{ errorLog }}</div>
      <form @submit.prevent="submitForm">
        <div class="mb-6">
          <label for="login" class="block text-gray-700 font-semibold mb-2">Login</label>
          <input id="login" type="text" v-model="login" required
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-semibold mb-2">Parol</label>
          <input id="password" type="password" v-model="password" required
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
        </div>
        <button type="submit"
          class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700">Sign In</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies();

const loading = ref(true);
let token = cookies.get('token');

onMounted(async () => {
  if (token) {
    navigateTo('/')
  } else {
    loading.value = false;
  }
})

let login = ref('')
let password = ref('')
let errorLog = ref('')

const submitForm = async (e) => {
  e.preventDefault()
  await axios.post('http://localhost:7777/api/v1/login', {
    login: login.value,
    password: password.value
  })
  .then(async response => {
    cookies.set('token', response.data.token);
    navigateTo("/");
  })
  .catch(error => {
    errorLog.value += error.response.data.message
  })
}
</script>
<style>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #1a202c;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>