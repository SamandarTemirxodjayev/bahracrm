<template>
  <div v-if="!loading">
    <SkladSidebar>
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
                <div v-for="(product, index) in fridge.products" :key="index">
                  {{ product.productId.name }} - {{ product.weight }} KG
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </SkladSidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>


<script setup>
import axios from "axios";

let loading = ref(true);
let fridges = ref([]);

onMounted(async () => {
  let token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  } else {
    try {
      const response = await axios.post(
        "http://localhost:7777/api/v1/userInfo",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.user_level !== 5) {
        window.location.href = "/";
      }
      try {
        const response = await axios.post(
          "http://localhost:7777/api/v1/sklad/fridge/get",
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fridges.value = response.data;
      } catch (error) {
        console.log(error);
      }
      loading.value = false;
    } catch (error) {
      if (error.response.status === 401) {
        window.location.href = "/logout";
      }
    }
    loading.value = false;
  }
});
</script>
