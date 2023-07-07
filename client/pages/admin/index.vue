<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="flex items-center">
        <NuxtLink to="/admin/users" class="m-2">
          <div class="square bg-blue-500 text-white">
            <div class="h-full flex flex-col items-center justify-center">
              <div class="text-5xl font-bold">
                {{ users.length }}
              </div>
              <div class="mt-4 text-center">Xodimlar soni</div>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink to="/admin/fridge">
          <div class="square bg-blue-500 text-white">
            <div class="h-full flex flex-col items-center justify-center">
              <div class="text-5xl font-bold">
                {{ fridges.length }}
              </div>
              <div class="mt-4 text-center">Xolodilniklar soni</div>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink to="/admin/product" class="m-2">
          <div class="square bg-blue-500 text-white">
            <div class="h-full flex flex-col items-center justify-center">
              <div class="text-5xl font-bold">
                {{ products.length }}
              </div>
              <div class="mt-4 text-center">Mahsulotlar soni</div>
            </div>
          </div>
        </NuxtLink>
      </div>
      <table class="w-full border border-gray-300 mt-8">
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
                {{item.company.name}} - [{{item.company.type}}]
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
    </AdminSidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
let loading = ref(true);
let users = ref([]);
let fridges = ref([]);
let products = ref([]);
let history = ref([]);

onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user_level !== 1) {
      window.location.href = "/";
      return;
    }
    const response = await $host.post("/users");
    users.value = response.data;
    const fridgesResponse = await $host.get('/admin/fridge')
    fridges.value = fridgesResponse.data;
    const productsResponse = await $host.get('/admin/product/', null,)
    products.value = productsResponse.data;
    const responses = await $host.post("/admin/lasthistory")
    history.value = responses.data;
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