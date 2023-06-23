<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="max-w-md mx-auto mt-8">
        <div
          class="bg-green-300 p-2 my-4"
          :class="success ? 'block' : 'hidden'"
        >
          <div class="text-lg font-semibold">
            Mahsulot muvaffaqiyatli yangilandi
          </div>
        </div>
        <form @submit="handleSubmit">
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Mahsulot Ismi</label
            >
            <input
              id="name"
              v-model="name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
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
          @click="deleteProduct"
          class=" my-2 w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Mahsulotni o'chirish
        </button>
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
let success = ref(false);
let name = ref("");

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
          "http://localhost:7777/api/v1/product/get/" + route.params.id,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fridges.value = response.data;
        name.value = response.data.name;
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
  e.preventDefault();
  loading.value = true;
  try {
    const response = await axios.post(
      "http://localhost:7777/api/v1/product/update/" + route.params.id,
      {
        name: name.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    success.value = true;
    loading.value = false;
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/logout";
    }
  }
};
const deleteProduct = async () => {
  loading.value = true;
  let token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/logout";
  }
  try {
    const response = await axios.delete(
      "http://localhost:7777/api/v1/product/" + route.params.id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.href = "/admin/product";
  } catch (error) {
    console.log(error);
  }
}
</script>


<!-- <template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="max-w-md mx-auto mt-8">
        <div
          class="bg-green-300 p-2 my-4"
          :class="success ? 'block' : 'hidden'"
        >
          <div class="text-lg font-semibold">
            Mahsulot muvaffaqiyatli yangilandi
          </div>
        </div>
        <form @submit="handleSubmit">
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Mahsulot Ismi</label
            >
            <input
              id="name"
              v-model="name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
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
          @click="deleteProduct"
          class=" my-2 w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Mahsulotni o'chirish
        </button>
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
let success = ref(false);
let name = ref("");

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
          "http://localhost:7777/api/v1/product/get/" + route.params.id,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fridges.value = response.data;
        name.value = response.data.name;
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
  e.preventDefault();
  loading.value = true;
  try {
    const response = await axios.post(
      "http://localhost:7777/api/v1/product/update/" + route.params.id,
      {
        name: name.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    success.value = true;
    loading.value = false;
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/logout";
    }
  }
};
const deleteProduct = async () => {
  loading.value = true;
  let token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/logout";
  }
  try {
    const response = await axios.delete(
      "http://localhost:7777/api/v1/product/" + route.params.id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.href = "/admin/product";
  } catch (error) {
    console.log(error);
  }
}
</script> -->
