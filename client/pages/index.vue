<template>
  <div v-if="!loading">
    <Loader />
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
      if(response.data.user_level === 6) {
        window.location.href = '/razdelka';
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
</script>
