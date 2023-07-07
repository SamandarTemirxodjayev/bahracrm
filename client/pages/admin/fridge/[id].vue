<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="max-w-md mx-auto mt-8">
        <div
          class="bg-green-300 p-2 my-4"
          :class="success ? 'block' : 'hidden'"
        >
          <div class="text-lg font-semibold">
            Muzlatgich muvaffaqiyatli yangilandi
          </div>
        </div>
        <form @submit="handleSubmit">
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Muzlatgich Ismi</label
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
          @click="deleteFridge"
          class=" my-2 w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Muzlatgichni o'chirish
        </button>
      </div>
    </AdminSidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
let loading = ref(true);
let fridges = ref([]);
let success = ref(false);
let name = ref("");

const route = useRoute();
onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user_level !== 1) {
      window.location.href = "/";
      return;
    }
    const fridgesRes = await $host.get("/admin/fridge/" + route.params.id);
    fridges.value = fridgesRes.data;
    name.value = fridgesRes.data.name;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});


const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    const response = await $host.post("/admin/fridge/" + route.params.id,{
      name: name.value,
    });
    success.value = true;
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};
const deleteFridge = async () => {
  loading.value = true;
  try {
    const response = await $host.delete("/admin/fridge/" + route.params.id);
    window.location.href = "/admin/fridge";
  } catch (error) {
    console.log(error);
  }
}
</script>
