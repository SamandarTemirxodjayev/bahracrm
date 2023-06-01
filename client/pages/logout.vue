<template>
  <div class="flex items-center justify-center h-screen bg-gray-300">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-4">Logging out...</h1>
      <div class="spinner"></div>
    </div>
  </div>
</template>

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

<script setup>
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { onMounted } from 'vue';

cookies.remove('token');
onMounted(() => {
  setTimeout(() => {
    window.location.href = '/login';
  }, 1000); // Redirect to the login page after 2 seconds
});
</script>
