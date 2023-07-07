<template>
  <div v-if="!loading">
    <SkladSidebar>
      <div class="max-w-md mx-auto mt-8">
        <div class="bg-green-300 p-2 my-4" :class="success ? 'block' : 'hidden'">
          <div class="text-lg font-semibold">
            Muvaffaqiyatli qo'shildi 
          </div>
        </div>
        <form @submit="handleSubmit">
          <div class="mb-4">
            <label for="options" class="block mb-2 text-sm font-medium text-gray-700">Mahsulotni Tanglang</label>
            <select v-model="product" id="options" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option v-for="item in products" :key="item._id" :value="item._id">{{ item.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">Jo'natuvchi Tashkilotni Tanglang</label>
            <select v-model="companyName" id="options" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option v-for="item in companies" :key="item._id" :value="item._id">{{ item.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">Mahsulot Vazni (KG)</label>
            <input v-model="weight" type="number" inputmode="numeric" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="options" class="block mb-2 text-sm font-medium text-gray-700">Muzlatgichni Tanglang</label>
            <select v-model="fridge" id="options" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option v-for="item in fridges" :key="item._id" :value="item._id">{{ item.name }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">Sana</label>
            <input disabled="disabled" v-model="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">Vaqt</label>
            <input disabled="disabled" v-model="time" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <button type="submit" class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">Submit</button>
          </div>
        </form>
      </div>
    </SkladSidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
let loading = ref(true);
let products = ref([]);
let fridges = ref([]);
let companies = ref([]);
let product = ref(null)
let fridge = ref(null)
let companyName = ref('')
let weight = ref('')
let success = ref(false);
let time = ref('');
let date = ref('');
let data = ref({
  name: '',
  surname: '',
  user_level: '',
  login: '',
  password: '',
});
const updateTimeAndDate = () => {
  const now = new Date();
  time.value = now.toLocaleTimeString();
  date.value = now.toLocaleDateString();
};
onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user_level !== 5) {
      window.location.href = "/";
      return;
    }
    const productResponse = await $host.get('/sklad/product')
    const fridgeResponse = await $host.get('/sklad/fridge')
    const companiesResponse = await $host.get('/sklad/company/import')
    companies.value = companiesResponse.data;
    products.value = productResponse.data;
    fridges.value = fridgeResponse.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
  updateTimeAndDate(); // Call the method to set initial values
  setInterval(updateTimeAndDate, 500); 
});

const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    const response = await $host.post('/sklad/global',{
      product: product.value,
      companyName: companyName.value,
      fridge: fridge.value,
      date: date.value,
      time: time.value,
      weight: weight.value,
    });
    data.value = response.data;
    weight.value = '';
    fridge.value = '';
    success.value = true;
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
}

</script>

