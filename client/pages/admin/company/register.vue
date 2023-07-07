<template>
  <div v-if="!loading">
    <AdminSidebar>
      <div class="max-w-md mx-auto mt-8">
        <div
          class="bg-green-300 p-2 my-4"
          :class="success ? 'block' : 'hidden'"
        >
          <div class="text-lg font-semibold">
            Kompaniya muvaffaqiyatli qo'shildi
          </div>
        </div>
        <form @submit="handleSubmit">
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Kompaniya Ismi</label
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
              for="options"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Kompaniya Turini Tanglang</label
            >
            <select
              v-model="type"
              id="options"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="import">Import</option>
              <option value="export">Export</option>
              <option value="bahra">Bahra</option>
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
      </div>
    </AdminSidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
let loading = ref(true);
let type = ref("");
let success = ref(false);
let name = ref("");

onMounted(async () => {
  try {
    const res = await $host.post("/userInfo");
    if (res.data.user_level !== 1) {
      window.location.href = "/";
      return;
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});

const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  await $host
    .post("/admin/company", {
      name: name.value,
      type: type.value,
    })
    .then((res) => {
      success.value = true;
      name.value = "";
    })
    .catch((err) => console.log(err));
  loading.value = false;
};
</script>
