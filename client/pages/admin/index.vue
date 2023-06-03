<template>
  <div v-if="!loading">
    <NuxtLink to="/logout" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors">
      Log Out
    </NuxtLink>
  </div>
  <div v-else><Loader /></div>
</template>

<script setup>
import axios from "axios";
let data = ref(null)
let loading = ref(true)
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
      if(response.data.user_level != 1) {
      window.location.href = '/';
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