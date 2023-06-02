<template>
  <div v-if="!loading" class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md">
      <form class="bg-white rounded-lg shadow-lg p-8" @submit="handleSubmit">
        <h2 class="text-2xl font-semibold mb-6">Login</h2>
        
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-semibold mb-2">Username</label>
          <input type="text" id="username" v-model="username" class="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-indigo-500">
        </div>
        
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
          <input type="password" id="password" v-model="password" class="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-indigo-500">
        </div>
        
        <button type="submit" class="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors">Login</button>
      </form>
    </div>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import axios from 'axios';

let loading = ref(true)
let username = ref("");
let password = ref("");


onMounted(() =>{
  let token = localStorage.getItem("token");
  if(token){
    navigateTo("/");
  }else{
    loading.value = false
  }
})


const handleSubmit = async (e) => {
  e.preventDefault()
  loading.value = true
  try {
    const res = await axios.post("http://localhost:7777/api/v1/login", {
      login: username.value,
      password: password.value,
    })
    if (res.data.token) {
      localStorage.setItem("token", res.data.token)
      navigateTo("/")
    }
  } catch (err) {
    console.log(err)
  }
  loading.value = false
}
definePageMeta({
  layout: false,
});
</script>
