<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="mt-8">
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-5 py-3 text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in fridges" :key="user._id" class="hover:bg-gray-200 cursor-pointer">
              <td class="px-5 py-3"><NuxtLink :to="`/admin/fridge/${user._id}`">{{ user.name }}</NuxtLink></td>
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
      if (response.data.user_level !== 1) {
        window.location.href = "/";
      }
      try {
        const response = await axios.post(
          "http://localhost:7777/api/v1/fridge/get",
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

const userPasswordf = () => {
  userPassword.value =!userPassword.value;
}
</script>
