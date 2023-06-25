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
                <div>Joylagan Muzlatgich: {{ item.fridge.name }}</div>
                <div>Tugatilgan vaqt: {{data[0].time}}</div>
                <div>Tugatilgan sana: {{data[0].date}}</div> <br>
              </div>
            </td>
            <td class="px-5 py-3 border border-black">
              {{item.musur}} KG
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
import axios from "axios";

let loading = ref(true);
let data = ref([]);

onMounted(async () => {
  let token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  } else {
    try {
      const response = await axios.post(
        "http://95.163.235.169:7777/api/v1/userInfo",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.user_level !== 1) {
        window.location.href = "/";
      }else{
        try {
          const res = await axios.post("http://95.163.235.169:7777/api/v1/admin/get/records", null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          data.value = res.data;
          console.log(res.data);
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
</script>
