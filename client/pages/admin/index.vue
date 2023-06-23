<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="flex items-center">
        <NuxtLink to="/admin/users" class="m-2">
          <div class="square bg-blue-500 text-white">
            <div class="h-full flex flex-col items-center justify-center">
              <div class="text-5xl font-bold">
                {{ users.length }}
              </div>
              <div class="mt-4 text-center">Xodimlar soni</div>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink to="/admin/fridge">
          <div class="square bg-blue-500 text-white">
            <div class="h-full flex flex-col items-center justify-center">
              <div class="text-5xl font-bold">
                {{ fridges.length }}
              </div>
              <div class="mt-4 text-center">Xolodilniklar soni</div>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink to="/admin/product" class="m-2">
          <div class="square bg-blue-500 text-white">
            <div class="h-full flex flex-col items-center justify-center">
              <div class="text-5xl font-bold">
                {{ products.length }}
              </div>
              <div class="mt-4 text-center">Mahsulotlar soni</div>
            </div>
          </div>
        </NuxtLink>
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
let users = ref([]);
let fridges = ref([]);
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
          "http://localhost:7777/api/v1/users",
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fridgesResponse = await axios.post('http://localhost:7777/api/v1/fridge/get', null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const productsResponse = await axios.post('http://localhost:7777/api/v1/product/get', null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        users.value = response.data;
        fridges.value = fridgesResponse.data;
        products.value = productsResponse.data;
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
<style scoped>
.square {
  width: 200px;
  height: 200px;
}
</style>
