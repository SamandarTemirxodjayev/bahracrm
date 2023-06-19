<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="mt-8">
        <table class="w-full border border-gray-300">
          <thead>
            <tr>
              <th class="px-3 py-3 text-left border border-black">Login</th>
              <th class="px-5 py-3 text-left border border-black">Ish turi</th>
              <th class="px-5 py-3 text-left border border-black">Mahsulot</th>
              <th class="px-5 py-3 text-left border border-black">Vazn</th>
              <th class="px-5 py-3 text-left border border-black">Muzlatgich</th>
              <th class="px-5 py-3 text-left border border-black">Vaqt</th>
              <th class="px-5 py-3 text-left border border-black">Sana</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fridge in history" :key="fridge._id" class="hover:bg-gray-200">
              <td class="px-5 py-3 border border-black">
                <div>{{ fridge.userId.name }} {{ fridge.userId.surname }}</div>
              </td>
              <td class="px-5 py-3 border border-black" v-for="namePart in fridge.name.split('||')" :key="namePart">
                <div>{{ namePart }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ fridge.time }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ fridge.date }}</div>
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
import axios from "axios";

let loading = ref(true);
let history = ref([]);

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
      } else {
      try {
        const skladResponse = await axios.get(
          "http://localhost:7777/api/v1/sklad/history",
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const razdelkaResponse = await axios.get(
              "http://localhost:7777/api/v1/razdelka/history",
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const skladOperations = skladResponse.data;
            const razdelkaOperations = razdelkaResponse.data;
            history.value = [...skladOperations, ...razdelkaOperations]
      } catch (error) {
        console.log(error);
      }
      console.log(history.value)
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
