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
<<<<<<< HEAD
              <td class="px-5 py-3"><div><NuxtLink :to="`/admin/product/${user._id}`">{{ user.name }}</NuxtLink></div></td>
=======
              <td class="px-5 py-3"><NuxtLink :to="`/admin/product/${user._id}`">{{ user.name }}</NuxtLink></td>
>>>>>>> 14342d44885684239b49f1635081739fe608af6f
              <td class="px-5 py-3"><div>{{ user.weight }} Kg</div></td>
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
import axios from "axios";

let loading = ref(true);
let products = ref([]);

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
      if (response.data.user_level !== 1) {
        window.location.href = "/";
      }
      try {
        const response = await axios.post(
          "http://localhost:7777/api/v1/product/get",
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        products.value = response.data;
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
