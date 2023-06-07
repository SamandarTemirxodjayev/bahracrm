<template>
  <div v-if="!loading">
    <RazdelkaSidebar>
      <div class="max-w-md mx-auto mt-8">
        <div class="bg-green-300 p-2 my-4" :class="success ? 'block' : 'hidden'">
          <div class="text-lg font-semibold">
            Muvaffaqiyatli qo'shildi 
          </div>
        </div>
        <form @submit="handleSubmit">
          <div class="mb-4">
            <label for="options" class="block mb-2 text-sm font-medium text-gray-700">Joylanadigan Mahsulotni Tanglang</label>
            <select v-model="product" id="options" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option v-for="item in products" :key="item._id" :value="item._id">{{ item.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">Mahsulot Vazni (KG)</label>
            <input v-model="weight" type="number" inputmode="numeric" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="options" class="block mb-2 text-sm font-medium text-gray-700">Muzlatgichni Tanglang</label>
            <select v-model="fridge" id="options" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option v-for="item in fridges" :key="item._id" :value="item._id">{{ item.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">Sana</label>
            <input disabled="disabled" v-model="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">Vaqt</label>
            <input disabled="disabled" v-model="time" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <button type="submit" class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">Submit</button>
          </div>
        </form>
      </div>
    </RazdelkaSidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import axios from 'axios';

let loading = ref(true);
let products = ref([]);
let fridges = ref([]);
let product = ref(null)
let fridge = ref(null)
let weight = ref('')
let success = ref(false);
let time = ref('');
let date = ref('');
const updateTimeAndDate = () => {
  const now = new Date();
  time.value = now.toLocaleTimeString();
  date.value = now.toLocaleDateString();
};

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
      if (response.data.user_level !== 6) {
        window.location.href = '/';
      }
      const productResponse = await axios.post('http://localhost:7777/api/v1/razdelka/product/get', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const fridgeResponse = await axios.post('http://localhost:7777/api/v1/razdelka/fridge/get', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      products.value = productResponse.data;
      fridges.value = fridgeResponse.data;
      loading.value = false;
    } catch (error) {
      if (error.response.status === 401) {
        window.location.href = '/logout';
      }
    }
    loading.value = false;
  }
  updateTimeAndDate(); // Call the method to set initial values
  setInterval(updateTimeAndDate, 500); 
});
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    const response = await axios.post(
      'http://localhost:7777/api/v1/razdelka/global/add',
      {
        product: product.value,
        fridge: fridge.value,
        date: date.value,
        time: time.value,
        weight: weight.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    weight.value = '';
    product.value = 
    fridge.value = '';
    success.value = true;
    loading.value = false;
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = '/logout';
    }
    loading.value = false;
  }
}

</script>

