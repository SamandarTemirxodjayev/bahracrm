<template>
  <div v-if="!loading">
    <AdminSidebar>
      <table class="w-full border border-gray-300">
        <thead>
          <tr>
            <th class="px-5 py-3 text-left border border-black">Xodim</th>
            <th class="px-5 py-3 text-left border border-black">Mahsulot</th>
            <th class="px-5 py-3 text-left border border-black">Natijalar</th>
            <th class="px-5 py-3 text-left border border-black">Qoldiqlar</th>
            <th class="px-5 py-3 text-left border border-black">Tugatilgan Vaqti</th>
            <th class="px-5 py-3 text-left border border-black">Tugatilgan Sanasi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item._id" class="hover:bg-gray-200">
            <td class="px-5 py-3 border border-black">
              <span>{{ item.userId.name }} {{ item.userId.surname }}</span>
            </td>
            <td class="px-5 py-3 border border-black">
              <div>Olinagan Muzlatgich: {{ item.about[0].fridge.name }}</div>
              <div>Olinagan Mahsulot: {{ item.about[0].product.name }}</div>
              <div>Olinagan Mahsulot Vazni: {{ item.about[0].weight }} KG</div>
              <div>Olinagan vaqti: {{ item.about[0].time }}</div>
              <div>Olinagan sanasi: {{ item.about[0].date }}</div>
            </td>
            <td class="px-5 py-3 border border-black">
              <div v-for="item in item.rows" :key="item._id">
                <div>Mahsulot Nomi: {{ item.product.name }}</div>
                <div>Mahsulot Vazni: {{ item.sum }} KG</div>
                <div>Joylagan Muzlatgich: {{ item.fridge.name }}</div><br>
              </div>
            </td>
            <td class="px-5 py-3 border border-black text-center">
              {{item.musur}} KG
            </td>
            <td class="px-5 py-3 border border-black text-center">
              {{item.time}}
            </td>
            <td class="px-5 py-3 border border-black text-center">
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
let data = ref([]);

onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user_level !== 1) {
      window.location.href = "/";
      return;
    }
    const response = await $host.get("/admin/records");
    data.value = response.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
}); 
</script>
