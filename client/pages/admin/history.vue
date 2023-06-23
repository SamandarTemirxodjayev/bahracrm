<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="mt-8">
        <p class="font-medium text-xl">Razdelka</p>
        <br/>
        <br/>
        <table class="w-full border border-gray-300">
          <thead>
            <tr>
              <th class="px-5 py-3 text-left border border-black">Login</th>
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
        <!-- <table class="mt-12 w-full border border-gray-300">
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
            <tr v-for="fridge in shistory" :key="fridge._id" class="hover:bg-gray-200">
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
        </table> -->
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
let history = ref([]);
let sfridges = ref([]);
let shistory = ref([]);

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
        const fridgesResponse = await axios.post('http://localhost:7777/api/v1/razdelka/fridge/get', null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const historyResponse = await axios.post('http://localhost:7777/api/v1/razdelka/history', null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const skladFridgesResponse = await axios.post('http://localhost:7777/api/v1/sklad/fridge/get', null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const skladHistoryResponse = await axios.post('http://localhost:7777/api/v1/sklad/history', null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(fridgesResponse);
        history.value = historyResponse.data;
        fridges.value = fridgesResponse.data;
        shistory.value = skladHistoryResponse.data;
        sfridges.value = skladFridgesResponse.data;
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

// const userPasswordf = () => {
//   userPassword.value =!userPassword.value;
// }
</script>

<style>
#app {
  font-family: 'Avenir', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>