<template>
  <div v-if="!loading" class="bg-gray-300">
    <ChatSidebar>
      <div class="max-w-md mx-auto pb-20">
        <div
          v-for="text in messages"
          :key="text._id"
          class="bg-gray-200 p-4 rounded-lg mb-4"
        >
          <p class="text-blue-500">{{ text.user }}</p>
          <p class="text-gray-800">{{ text.text }}</p>
          <div class="flex items-center justify-between mt-2">
            <p class="text-gray-600">{{ text.date }} {{ text.time }}</p>
          </div>
        </div>
        <div class="fixed bottom-10 w-full">
          <div class="max-w-md">
            <div class="relative flex">
              <form @submit="sendMessage" class="w-[500px]">
                <input
                  v-model="message"
                  placeholder="Type your message"
                  class="w-full py-2 pl-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  class="absolute right-1 bottom-1 flex items-center justify-center w-9 h-9 rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-white transform rotate-90"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ChatSidebar>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import axios from "axios";

let loading = ref(true);
let message = ref("");
let messages = reactive([]);

const sendMessage = async (e) => {
  e.preventDefault();
  if (!message.value) {
    return;
  }
  let token = localStorage.getItem("token");
  try {
    await axios.put(
      "http://localhost:7777/api/v1/chat",
      { text: message.value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const chatResponse = await axios.get("http://localhost:7777/api/v1/chat");
    messages = chatResponse.data;
    message.value = "";
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  let token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  } else {
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
      try {
        const chatResponse = await axios.get(
          "http://localhost:7777/api/v1/chat"
        );
        messages = chatResponse.data;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      if (error.response.status === 401) {
        window.location.href = "/logout";
      }
    }
  }
  updateMessages(); // Call the method to set initial values
  setInterval(updateMessages, 1000); // Update values every second
  loading.value = false;
});
const updateMessages = async () => {
  const chatResponse = await axios.get("http://localhost:7777/api/v1/chat");
  messages = chatResponse.data;
};
</script>

<style>
input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
}

button:hover {
  background-color: #4f46e5;
}

.Loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
