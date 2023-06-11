<template>
  <div class="mx-4 flex text-xl text-gray-500">
    <span class="pr-4">{{ currentTime }}</span>
    <span>{{ currentDate }}</span>
  </div>
</template>

<script>

export default {
  setup() {
    const currentTime = ref('');
    const currentDate = ref('');

    const updateTimeAndDate = () => {
      const now = new Date();
      currentTime.value = now.toLocaleTimeString();
      currentDate.value = now.toLocaleDateString();
    };

    onMounted(() => {
      updateTimeAndDate(); // Call the method to set initial values
      setInterval(updateTimeAndDate, 1000); // Update values every second
    });

    return {
      currentTime,
      currentDate
    };
  }
};
</script>
