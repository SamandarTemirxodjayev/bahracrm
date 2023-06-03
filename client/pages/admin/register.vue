<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="max-w-md mx-auto mt-8">
        <div class="bg-green-300 p-2 my-4" :class="success ? 'block' : 'hidden'">
          <div class="text-lg font-semibold">
            Xodim muvaffaqiyatli qo'shildi qo'shildi 
          </div>
          <div class="font-semibold">
            <div>
              Ismi: {{data.name || 'N/A'}}
            </div>
            <div>
              Familiyasi: {{data.surname || 'N/A'}}
            </div>
            <div>
              Darajasi: {{data.user_level || 'N/A'}}
            </div>
            <div>
              Login: {{data.login || 'N/A'}}
            </div>
            <div>
              Parol: {{data.password || 'N/A'}}
            </div>
          </div>
        </div>
        <form @submit="handleSubmit">
          <div class="mb-4">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-700">Xodim Ismi</label>
            <input id="name" v-model="name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="surname" class="block mb-2 text-sm font-medium text-gray-700">Xodim Familiyasi</label>
            <input id="surname" v-model="surname" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="options" class="block mb-2 text-sm font-medium text-gray-700">Xodim Lavozimi</label>
            <select v-model="user_level" id="options" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="1">Admin (Direktor)</option>
              <option value="2">PM (Manager)</option>
              <option value="3">Kassir</option>
              <option value="4">Realizator</option>
            </select>
          </div>
          <div>
            <button type="submit" class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">Submit</button>
          </div>
        </form>
      </div>
    </AdminSidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import axios from 'axios';

let loading = ref(true);

onMounted(async () => {
  let token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
  } else {
    try {
      const response = await axios.post(
        'http://localhost:7777/api/v1/userInfo',
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.user_level !== 1) {
        window.location.href = '/';
      }
      loading.value = false;
    } catch (error) {
      if (error.response.status === 401) {
        window.location.href = '/logout';
      }
    }
    loading.value = false;
  }
});

let name = ref('');
let surname = ref('');
let user_level = ref(null);
let success = ref(false);
let data = ref({
  name: '',
  surname: '',
  user_level: '',
  login: '',
  password: '',
});

const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  console.log(name.value, surname.value, user_level.value);
  try {
    const response = await axios.post(
      'http://localhost:7777/api/v1/register',
      {
        name: name.value,
        surname: surname.value,
        user_level: user_level.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    data.value = response.data;
    success.value = true;
    loading.value = false;
    name.value = '';
    surname.value = '';
    user_level.value = null;
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = '/logout';
    }
    loading.value = false;
  }
}

</script>
