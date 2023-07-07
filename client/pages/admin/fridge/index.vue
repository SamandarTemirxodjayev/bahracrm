<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="mt-8">
        <NuxtLink to="/admin/fridge/register" class="flex justify-end mb-4 mr-10">
          <button class="text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-sm font-semibold">
            Muzlatgich Qo'shish
          </button>
        </NuxtLink>
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-5 py-3 text-left">Name</th>
              <th class="px-5 py-3 text-left">Kg</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in fridges" :key="user._id" class="hover:bg-gray-200 cursor-pointer">
              <td class="px-5 py-3"><div><NuxtLink :to="`/admin/fridge/${user._id}`">{{ user.name }}</NuxtLink></div></td>
              <td class="px-5 py-3"><div v-for="(products, index) in user.products" :key="index">
                {{ products.productId.name }} - {{ products.weight }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminSidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>


<script setup>
let loading = ref(true);
let fridges = ref([]);

onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user_level !== 1) {
      window.location.href = "/";
      return;
    }
    const response = await $host.get("/admin/fridge");
    fridges.value = response.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
</script>
