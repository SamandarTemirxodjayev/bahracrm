<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="max-w-md mx-auto mt-8">
        <form @submit="handleSubmit">
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Xodim Ismi</label
            >
            <input
              id="name"
              v-model="name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="surname"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Xodim Familiyasi</label
            >
            <input
              id="surname"
              v-model="surname"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="options"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Xodim Lavozimi</label
            >
            <select
              v-model="user_level"
              id="options"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1">Admin (Direktor)</option>
              <option value="2">PM (Manager)</option>
              <option value="3">Kassir</option>
              <option value="4">Realizator</option>
              <option value="5">Skladchi (Kirgizuvchi)</option>
              <option value="6">Razdelkachi</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
        <button
          @click="deleteUser"
          class="w-full px-4 py-2 my-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Xodimni ishdan bo'shatish
        </button>
      </div>
    </AdminSidebar>
  </div>
  <div v-else><Loader /></div>
</template>

<script setup>
import axios from "axios";

let loading = ref(true);
let data = ref(null);
let users = ref([]);
let name = ref("");
let surname = ref("");
let user_level = ref(null);
const route = useRoute();

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
          "http://localhost:7777/api/v1/user/" + route.params.id,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        users.value = response.data;
        name.value = users.value.name;
        surname.value = users.value.surname;
        user_level.value = users.value.user_level;
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

const handleSubmit = async (e) => {
  loading.value = true;
  e.preventDefault();
  let token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/logout";
  }
  try {
    const response = await axios.post(
      "http://localhost:7777/api/v1/user/edit/" + route.params.id,
      {
        name: name.value,
        surname: surname.value,
        user_level: user_level.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    users.value = response.data;
    name.value = users.value.name;
    surname.value = users.value.surname;
    user_level.value = users.value.user_level;
    loading.value = false;
    alert("Yangilandi");
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async () => {
  loading.value = true;
  let token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/logout";
  }
  try {
    const response = await axios.delete(
      "http://localhost:7777/api/v1/user/" + route.params.id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Xodimni ishdan bo'shatildi");
    window.location.href = "/admin/users";
  } catch (error) {
    console.log(error);
  }
}
</script>
