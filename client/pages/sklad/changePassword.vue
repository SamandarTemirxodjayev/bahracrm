<template>
  <div v-if="!loading">
    <SkladSidebar>
      <div class="max-w-md mx-auto mt-8">
        <div class="bg-green-300 p-2 my-4" :class="success ? 'block' : 'hidden'">
          <div class="text-lg font-semibold">
            Parol muvaffaqiyatli yangilandi
          </div>
        </div>
        <div class="bg-red-300 p-2 my-4" :class="err ? 'block' : 'hidden'">
          <div class="text-lg font-semibold">
            {{errT}}
          </div>
        </div>
        <form @submit="handleSubmit">
          <div class="mb-4">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-700">Yangi Parol</label>
            <input id="name" v-model="password" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-700">Yangi parolni qayta kiriting</label>
            <input id="name" v-model="password2" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
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
import axios from 'axios'
let password = ref('')
let password2 = ref('')
let err = ref(false)
let success = ref(false)
let errT = ref("")
let loading = ref(false)

const handleSubmit = async(e) => {
  loading.value = true
  e.preventDefault()
  if (password.value == password2.value) {
    try {
      const res = axios.post("http://localhost:7777/api/v1/changePassword", {
      password: password.value
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    success.value = true
    } catch (error) {
      console.log(error)
    }
    password2.value = ''
    password.value = ''
  }else{
    err.value = true
    errT.value = 'Kiritilgan parol bir xil emas'
  }
  loading.value = false
}
</script>