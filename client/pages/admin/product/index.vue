<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="mt-8">
        <NuxtLink to="/admin/product/register" class="flex justify-end mb-4 mr-10">
          <button class="text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-sm font-semibold">
            Mahsulot Qo'shish
          </button>
        </NuxtLink>
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-5 py-3 text-left">Name</th>
              <th class="px-5 py-3 text-left">Vazn</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in products" :key="user._id" class="hover:bg-gray-200 cursor-pointer">
              <td class="px-5 py-3"><div><NuxtLink :to="`/admin/product/${user._id}`">{{ user.name }}</NuxtLink></div></td>
              <td class="px-5 py-3"><div>{{ user.weight }} Kg</div></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Pie :data="data" :options="options" />
      </div>
    </AdminSidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>


<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

let loading = ref(true);
let products = ref([]);
let data = ref()
let options = ref({
  responsive: true,
  maintainAspectRatio: false
})

onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user_level !== 1) {
      window.location.href = "/";
      return;
    }
    const response = await $host.get("/admin/product");
    products.value = response.data;
    data.value = {
      labels: response.data.map((item) => item.name),
      datasets: [{
        backgroundColor: ['#00FF00', '#00FFFF', '#FFA500', '#FFFF00', '#FF00FF', '#7FFFD4'],
        data: response.data.map((item) => item.weight),
      }]
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
</script>
