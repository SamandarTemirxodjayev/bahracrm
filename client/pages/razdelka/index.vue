<template>
  <div v-if="!loading">
    <RazdelkaSidebar>
      <div class="flex items-center">
        <NuxtLink to="/razdelka/fridge">
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
    </RazdelkaSidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
let loading = ref(true);
let fridges = ref([]);
let history = ref([]);

onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user_level !== 6) {
      window.location.href = "/";
      return;
    }
    const fridgesResponse = await $host.get("/razdelka/fridge");
    fridges.value = fridgesResponse.data;
    const historyResponse = await $host.get('/razdelka/history')
    history.value = historyResponse.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
</script>
<style scoped>
.square {
  width: 200px;
  height: 200px;
}
</style>
