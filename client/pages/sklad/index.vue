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
        <select
          v-model="companyName"
          @change="HandleChange"
          id="options"
          class="my-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value=""></option>
          <option
            v-for="item in companies"
            :key="item._id"
            :value="item._id"
          >
            {{ item.name }} {{ item.surname }}
          </option>
        </select>
        <table class="w-full border border-gray-300">
          <thead>
            <tr>
              <th class="px-5 py-3 text-left border border-black">Login</th>
              <th class="px-5 py-3 text-left border border-black">Ish turi</th>
              <th class="px-5 py-3 text-left border border-black">Kompaniya</th>
              <th class="px-5 py-3 text-left border border-black">Mahsulot</th>
              <th class="px-5 py-3 text-left border border-black">Vazn</th>
              <th class="px-5 py-3 text-left border border-black">Muzlatgich</th>
              <th class="px-5 py-3 text-left border border-black">Vaqt</th>
              <th class="px-5 py-3 text-left border border-black">Sana</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="historyItem in history" :key="historyItem._id" class="hover:bg-gray-200">
              <td class="px-5 py-3 border border-black">
                <div>{{ historyItem.userId.name }} {{ historyItem.userId.surname }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ historyItem.do.name }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ historyItem.company.name }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ historyItem.do.productId.name }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ historyItem.do.weight }} KG</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ historyItem.do.fridge.name }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ historyItem.time }}</div>
              </td>
              <td class="px-5 py-3 border border-black">
                <div>{{ historyItem.date }}</div>
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
let loading = ref(true);
let fridges = ref([]);
let history = ref([]);
let companyName = ref("");
let companies = ref([]);

onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user_level !== 5) {
      window.location.href = "/";
      return;
    }
    const fridgesResponse = await $host.get("/sklad/fridge");
    fridges.value = fridgesResponse.data;
    const historyResponse = await $host.get('/sklad/history')
    history.value = historyResponse.data;
    const companiesResponse = await $host.get('/sklad/company')
    companies.value = companiesResponse.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});

const HandleChange = async() => {
  const res = await $host.get("/sklad/history/" + companyName.value)
  history.value = res.data;
}
</script>
<style scoped>
.square {
  width: 200px;
  height: 200px;
}
</style>
