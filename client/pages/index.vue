<template>
  <div v-if="!loading">
    <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">
      Log Out
    </button>
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
      if(response.data.user_level === 5) {
        window.location.href = '/sklad';
      }
      loading.value = false;
      
    } catch (error) {
      if(error.response.status == 401) {
        window.location.href = '/logout';
      }
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
