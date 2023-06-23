<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="mt-8">
        <NuxtLink to="/admin/register" class="flex justify-end mb-4 mr-10">
          <button class="text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-sm font-semibold">
            Xodim Qo'shish
          </button>
        </NuxtLink>
        <table class="w-full">
          <thead>
            <tr>
              <th class="px-5 py-3 text-left">Name</th>
              <th class="px-5 py-3 text-left">Surname</th>
              <th class="px-5 py-3 text-left">User Level</th>
              <th class="px-5 py-3 text-left">Login</th>
              <th @click="userPasswordf" class="cursor-pointer px-5 py-3 text-left">Password</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id" class="hover:bg-gray-200 cursor-pointer">
              <td class="px-5 py-3"><NuxtLink :to="`/admin/user/${user._id}`">{{ user.name }}</NuxtLink></td>
              <td class="px-5 py-3">{{ user.surname }}</td>
              <td class="px-5 py-3">{{ user.user_level }}</td>
              <td class="px-5 py-3">{{ user.login }}</td>
              <td  class="px-5 py-3"><span v-if="!userPassword">*************</span><span v-else>{{ user.password }}</span></td>
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
let data = ref(null);
let userPassword = ref(false);
let users = ref([]);

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
        users.value = response.data;
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
