<template>
  <div v-if="!loading">
    <RazdelkaSidebar>
      <div class="max-w-md mx-auto mt-8">
        <div class="bg-green-300 p-2 my-4" :class="success ? 'block' : 'hidden'">
          <div class="text-lg font-semibold">
            Muvaffaqiyatli Olindi
          </div>
        </div>
        <div class="bg-red-300 p-2 my-4" :class="errort ? 'block' : 'hidden'">
          <div class="text-lg font-semibold">
            {{errorText}} 
          </div>
        </div>
        <form @submit="handleSubmit">
          <div class="mb-4">
            <label for="options" class="block mb-2 text-sm font-medium text-gray-700">Olinadigan Mahsulotni Tanglang</label>
            <select v-model="product" id="options" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option v-for="item in products" :key="item._id" :value="item._id">{{ item.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="options" class="block mb-2 text-sm font-medium text-gray-700">Muzlatgichni Tanglang</label>
            <select v-model="fridge" id="options" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option v-for="item in fridges" :key="item._id" :value="item._id">{{ item.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">Mahsulot Vazni (KG)</label>
            <input v-model="weight" type="number" inputmode="numeric" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
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
let errorText = ref('')
let errort = ref(false)
const updateTimeAndDate = () => {
  const now = new Date();
  time.value = now.toLocaleTimeString();
  date.value = now.toLocaleDateString();
};
onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user_level !== 6) {
      window.location.href = "/";
      return;
    }
    const fridgesResponse = await $host.get("/razdelka/fridge");
    fridges.value = fridgesResponse.data;
    const productResponse = await $host.get("/razdelka/product");
    products.value = productResponse.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
  updateTimeAndDate(); // Call the method to set initial values
  setInterval(updateTimeAndDate, 500);
});
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    const response = await $host.put('/razdelka/global',{
      product: product.value,
      fridge: fridge.value,
      date: date.value,
      time: time.value,
      weight: weight.value,
    });
    // localStorage.setItem()
    let succes = {
      product: product.value,
      productName: response.data.name,
      fridge: fridge.value,
      date: date.value,
      time: time.value,
      weight: weight.value,
    }
    localStorage.setItem('razdelka', JSON.stringify(succes));
    weight.value = '';
    product.value = null;
    fridge.value = null;
    success.value = true;
    loading.value = false;
  } catch (error) {
    errorText.value = "Mahsulot yetarlicha emas";
    errort.value = true;
    console.log(error);
    loading.value = false;
  }
}
</script>

