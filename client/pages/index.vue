<template>
<<<<<<< HEAD
  <div v-if="!loading">
    <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">
      Log Out
    </button>
=======
  <div>
    <template v-if="loading">
      <div class="flex items-center justify-center h-screen bg-gray-300">
        <div class="text-center">
          <h1 class="text-3xl font-bold mb-4">Loading...</h1>
          <div class="spinner"></div>
        </div>
      </div>
    </template>
    <template v-else>
      <span class="mr-2">Hello</span>
      <span>{{ userData.name }}</span>
      <div v-if="userData.user_level === 1 && userData.user_level === 2">
        <AdminRegister />
      </div>
    </template>
    
>>>>>>> 98dd89e90a6aed614cbfd969958c2ffd9656a95d
  </div>
  <div v-else><Loader /></div>
</template>

<script setup>
import axios from "axios";

let loading = ref(true);
let data = ref(null);

onMounted(async () => {
  let token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
  } else {
    try {
      const response = await axios.post('http://localhost:7777/api/v1/userInfo', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      data.value = response.data;
      if(response.data.user_level === 1) {
      window.location.href = '/admin';
    }
      loading.value = false;
      
    } catch (error) {
      console.error(error);
    }
    
    loading.value = false;
  }
});

const logout = () => {
  loading.value = true;
  localStorage.removeItem("token");
  window.location.href = "/login";
}
</script>
