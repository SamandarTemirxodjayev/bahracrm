<template>
  <div v-if="!loading">
    <SkladSidebar>
      <div class="flex items-center">
        <NuxtLink to="/sklad/fridge">
          <div class="square bg-blue-500 text-white">
            <div class="h-full flex flex-col items-center justify-center">
              <div class="text-5xl font-bold">
                {{ fridges.length }}
              </div>
              <div class="mt-4 text-center">Xolodilnik</div>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="mt-8">
        <table class="w-full border border-gray-300">
          <thead>
            <tr>
              <th class="px-5 py-3 text-left border border-black">Login</th>
              <th class="px-5 py-3 text-left border border-black">Ish turi</th>
              <th class="px-5 py-3 text-left border border-black">Mahsulot</th>
              <th class="px-5 py-3 text-left border border-black">Kompaniya</th>
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
      if (response.data.user_level !== 5) {
        window.location.href = "/";
      }
      try {
        const fridgesResponse = await axios.post('http://localhost:7777/api/v1/sklad/fridge/get', null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const historyResponse = await axios.post('http://localhost:7777/api/v1/sklad/history', null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        history.value = historyResponse.data;
        fridges.value = fridgesResponse.data;
        console.log(historyResponse.data);
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
