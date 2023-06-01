<template>
  <div>
    <div class="flex items-center justify-center min-h-screen">
      <div class="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 class="text-3xl font-bold mb-6 text-center">Registratsiya</h2>
        <div class="text-red-500 text-lg font-semibold">{{ errorLog }}</div>
        <form @submit.prevent="registerUser">
          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2">Ism</label>
            <input
              type="text"
              v-model="name"
              required
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2"
              >Familiya</label
            >
            <input
              type="text"
              v-model="surname"
              required
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 font-semibold mb-2"
              >Lavozim</label
            >
            <select
              v-model.number="position"
              required
              class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="1">Admin</option>
              <option value="2">Program Manager</option>
              <option value="3">User</option>
            </select>
          </div>
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { $host } from '~/axios.js';
import Swal from'sweetalert2';

const loading = ref(true);
let userData = ref('');
let errorLog = ref('');
let name = ref('');
let surname = ref('');
let position = ref(null);

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
</script>