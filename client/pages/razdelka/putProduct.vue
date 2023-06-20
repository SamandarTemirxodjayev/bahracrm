<template>
  <div v-if="!loading">
    <RazdelkaSidebar>
      <div class="bg-green-300 p-2 my-4" :class="success ? 'block' : 'hidden'">
        <div class="text-lg font-semibold">Muvaffaqiyatli qo'shildi</div>
      </div>
      <div class="w-full">
        <h1 class="text-3xl text-center">
          Mahsulot:
          <span class="font-semibold">{{ razdelka.product }}</span> Og'irlik:
          <span class="font-semibold">{{ razdelka.weight }} KG</span> Sana:
          <span class="font-semibold">{{ razdelka.date }}</span> Vaqt:
          <span class="font-semibold">{{ razdelka.time }}</span>
        </h1>
      </div>
      <div class="my-4">
        <button
          @click="addRow"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Mahsulot Qo'shish
        </button>
      </div>
      <table class="w-full border border-gray-300">
        <thead>
          <tr>
            <th class="px-5 py-3 text-left border border-black">Mahsulot nomi</th>
            <th class="px-5 py-3 text-left border border-black">Vazn</th>
            <th class="px-5 py-3 text-left border border-black">Muzlatgich</th>
            <th class="px-5 py-3 text-left border border-black">Sana</th>
            <th class="px-5 py-3 text-left border border-black">Vaqt</th>
            <th class="px-5 py-3 text-left border border-black">Submit</th>
          </tr>
        </thead>
        <tbody>
          <!-- Render rows using v-for loop -->
          <tr v-for="(row, index) in rows" :key="row.id">
            <td class="px-5 py-3 border border-black">
              <select
                v-model="row.product"
                id="options"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option
                  v-for="item in products"
                  :key="item._id"
                  :value="item._id"
                >
                  {{ item.name }}
                </option>
              </select>
            </td>
            <td class="px-5 py-3 border border-black">
              <div class="flex items-center">
                <input
                  v-model="row.weight"
                  type="number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mx-3"
                />
                {{ row.sum }}
              </div>
            </td>
            <td class="px-5 py-3 border border-black">
              <select
                v-model="row.fridge"
                id="options"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option
                  v-for="item in fridges"
                  :key="item._id"
                  :value="item._id"
                >
                  {{ item.name }}
                </option>
              </select>
            </td>
            <td class="px-5 py-3 border border-black">
              <div>
                {{ date }}
              </div>
            </td>
            <td class="px-5 py-3 border border-black">
              <div>
                {{ time }}
              </div>
            </td>
            <td class="px-5 py-3 border border-black">
              <div @click="handleClick(index)">
                <button
                  type="submit"
                  class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td class="px-5 py-3 border border-black text-center">
              <div>Musur</div>
            </td>
            <td class="px-5 py-3 border border-black text-center">
              <div>{{ musur }}</div>
            </td>
            <td class="px-5 py-3 border border-black text-center">-</td>
            <td class="px-5 py-3 border border-black">
              <div>
                {{ date }}
              </div>
            </td>
            <td class="px-5 py-3 border border-black">
              <div>
                {{ time }}
              </div>
            </td>
            <td class="px-5 py-3 border border-black text-center">-</td>
          </tr>
        </tbody>
      </table>
      <div @click="handleTable()" class="mt-8">
        <button
          type="submit"
          class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </RazdelkaSidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import axios from "axios";

let loading = ref(true);
let products = ref([]);
let fridges = ref([]);
let product = ref(null);
let fridge = ref(null);
let weight = ref("");
let success = ref(false);
let time = ref("");
let date = ref("");
let razdelka = reactive({});
let rows = reactive([]);
let musur = ref(0);
const updateTimeAndDate = () => {
  const now = new Date();
  time.value = now.toLocaleTimeString();
  date.value = now.toLocaleDateString();
};

onMounted(async () => {
  let token = localStorage.getItem("token");
  let razdelkatoken = localStorage.getItem("razdelka");
  if (!token || !razdelkatoken) {
    window.location.href = "/razdelka";
  } else {
    razdelka = JSON.parse(razdelkatoken);
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
      if (response.data.user_level !== 6) {
        window.location.href = "/";
      }
      const productResponse = await axios.post(
        "http://localhost:7777/api/v1/razdelka/product/get",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fridgeResponse = await axios.post(
        "http://localhost:7777/api/v1/razdelka/fridge/get",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const razdelkaResponse = await axios.post(
        "http://localhost:7777/api/v1/razdelka/product/get/" + razdelka.product,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      razdelka.product = razdelkaResponse.data.name;
      products.value = productResponse.data;
      fridges.value = fridgeResponse.data;
      loading.value = false;
      let leocla = localStorage.getItem("rows") ? JSON.parse(localStorage.getItem("rows")) : [];
      rows = leocla;
      calculateMusur();
    } catch (error) {
      if (error.response.status === 401) {
        window.location.href = "/logout";
      }
    }
    loading.value = false;
  }
  updateTimeAndDate(); // Call the method to set initial values
  setInterval(updateTimeAndDate, 100);
});
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    const response = await axios.post(
      "http://localhost:7777/api/v1/razdelka/global/add",
      {
        product: product.value,
        fridge: fridge.value,
        date: date.value,
        time: time.value,
        weight: weight.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    weight.value = "";
    product.value = fridge.value = "";
    success.value = true;
    loading.value = false;
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/logout";
    }
    loading.value = false;
  }
};
const addRow = () => {
  const storedRows = JSON.parse(localStorage.getItem("rows")) || [];
  storedRows.push({
    product: null,
    weight: "",
    fridge: null,
    sum: 0,
  });
  localStorage.setItem("rows", JSON.stringify(storedRows));
  rows = reactive(storedRows);
  if(rows.length  == 1) {
    window.location.reload();
  }
};

const handleClick = async (id) =>{
  loading.value = true;
  let row = JSON.parse(localStorage.getItem("rows")) || [];
  row[id].product = rows[id].product;
  row[id].weight = rows[id].weight;
  row[id].fridge = rows[id].fridge;
  row[id].sum += rows[id].weight;
  rows[id].sum += rows[id].weight;
  try {
    const response = await axios.post(
      "http://localhost:7777/api/v1/razdelka/global/add",
      {
        product: rows[id].product,
        fridge: rows[id].fridge,
        date: date.value,
        time: time.value,
        weight: rows[id].weight,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/logout";
    }
  }
  calculateMusur();
  loading.value = false;
  localStorage.setItem("rows", JSON.stringify(row));
}
const calculateMusur = () => {
  let totalSum = 0;
  for (const row of rows) {
    totalSum += row.sum;
  }
  musur.value = razdelka.weight - totalSum;
};
const handleTable = async() => {
  loading.value = true;
  try {
    const response = await axios.post(
      "http://localhost:7777/api/v1/razdelka/add/record",
      {
        musur: musur.value,
        rows: rows,
        date: date.value,
        time: time.value,
        allweight: localStorage.getItem("razdelka")? JSON.parse(localStorage.getItem("razdelka")) : []
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    success.value = true;
    localStorage.removeItem("rows");
    localStorage.removeItem("razdelka");
    alert("Mufaqqiyatli Saqlandi");
    window.location.reload();
  } catch (error) {
    if (error.response.status === 401) {
      window.location.href = "/logout";
    }
  }
  loading.value = false;
};
</script>
