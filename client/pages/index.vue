<!-- index.vue -->
<template>
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
      <div v-if="userData.user_level === 1">
        <AdminRegister />
      </div>
    </template>
    
  </div>
</template>

<script setup>
import Cookies from 'universal-cookie';
import { ref, onMounted } from 'vue';
import { $host } from '~/axios.js';
import Swal from'sweetalert2';

const loading = ref(true);
let userData = ref('');
let errorLog = ref('');
let name = ref('');
let surname = ref('');
let position = ref(null);

const cookies = new Cookies();
const token = cookies.get('token');

const registerUser = () => {
  loading.value = true;
  const data = {
    name: name.value,
    surname: surname.value,
    user_level: position.value,
  };
  console.log(data);
  $host.post('/register', data)
  .then((res) => {
      loading.value = false;
      console.log(res);
      errorLog.value = '';
      name.value = '';
      surname.value = '';
      position.value = null;
      Swal.fire({
        icon: 'success',
        title: `Name: <b>${res.data.name}</b>\nSurname: <b>${res.data.surname}</b>\nUser Level: <b>${res.data.user_level}</b>\nLogin: <b>${res.data.login}</b>\nPassword: <b>${res.data.password}</b>`,
      })
    })
  .catch((err) => {
      loading.value = false;
      errorLog.value = err.response.data.message;
    });
}

onMounted(async () => {
  if (!token) {
    navigateTo('/login');
  } else {
    try {
      const response = await $host.post('/userInfo')
      userData.value = response.data
      loading.value = false
    } catch (error) {
      console.log(error)
    }
  }
})

</script>
