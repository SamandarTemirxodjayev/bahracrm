<template>
  <div v-if="!loading">
    <RazdelkaSidebar>
      <div class="mt-8">
        <table class="w-full border border-gray-300">
          <thead>
            <tr>
              <th class="px-5 py-3 text-left border border-black">Muzlatgich</th>
              <th class="px-5 py-3 text-left border border-black">Mahsulotlar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fridge in fridges" :key="fridge._id" class="hover:bg-gray-200">
              <td class="px-5 py-3 border border-black">
                <div>{{ fridge.name }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div v-for="product in fridge.products" :key="product._id">
                  {{ product.productId.name }} - {{ product.weight }} KG
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </RazdelkaSidebar>
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
    if (res.data.user_level !== 6) {
      window.location.href = "/";
      return;
    }
    const fridgesResponse = await $host.get("/razdelka/fridge");
    fridges.value = fridgesResponse.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
</script>