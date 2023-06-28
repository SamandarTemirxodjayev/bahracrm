<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="mt-8">
        <select
          v-model="user"
          @change="HandleChange"
          id="options"
          class="my-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option
            v-for="item in users"
            :key="item._id"
            :value="item._id"
          >
            {{ item.name }} {{ item.surname }}
          </option>
        </select>
        <table class="w-full border border-gray-300">
          <thead>
            <tr>
              <th class="px-5 py-3 text-left border border-black">Xodim</th>
              <th class="px-5 py-3 text-left border border-black">Ish turi</th>
              <th class="px-5 py-3 text-left border border-black">Kompaniya</th>
              <th class="px-5 py-3 text-left border border-black">Mahsulot</th>
              <th class="px-5 py-3 text-left border border-black">Vazn</th>
              <th class="px-5 py-3 text-left border border-black">Muzlatgich</th>
              <th class="px-5 py-3 text-left border border-black">Vaqti</th>
              <th class="px-5 py-3 text-left border border-black">Sanasi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in history" :key="item._id" class="hover:bg-gray-200">
              <td class="px-5 py-3 border border-black">
                <span>{{ item.userId.name }} {{ item.userId.surname }}</span>
              </td>
              <td class="px-5 py-3 border border-black">
                {{item.do.name}}
              </td>
              <td class="px-5 py-3 border border-black">
                {{item.company.name}} - [ {{ item.company.type }} ]
              </td>
              <td class="px-5 py-3 border border-black">
                {{item.do.productId.name}}
              </td>
              <td class="px-5 py-3 border border-black">
                {{item.do.weight}} KG
              </td>
              <td class="px-5 py-3 border border-black">
                {{item.do.fridge.name}}
              </td>
              <td class="px-5 py-3 border border-black">
                {{item.time}}
              </td>
              <td class="px-5 py-3 border border-black">
                {{item.date}}
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
let list = ref(0);
let users = ref([]);
let user = ref("");

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
          const response = await axios.post("http://localhost:7777/api/v1/admin/history?page=" + list.value, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          history.value = response.data;
          const res = await axios.post("http://localhost:7777/api/v1/users", null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          users.value = res.data;
        } catch (error) {
          console.log(error);
        }
    }
    } catch (error) {
      if (error.response.status === 401) {
        window.location.href = "/logout";
      }
    }
    loading.value = false;
  }
});
const HandleChange = async() => {
  loading.value = true;
  try {
    const res = await axios.post("http://localhost:7777/api/v1/admin/history/" + user.value, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    history.value = res.data;
    loading.value = false;
  } catch (error) { 
    console.log(error);
  }
}
</script>
