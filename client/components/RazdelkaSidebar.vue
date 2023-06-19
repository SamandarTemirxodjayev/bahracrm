<template>
  <div>
    <div class="flex h-screen bg-gray-100">
      <div class="w-64 bg-white border-r">
        <div class="p-4">
          <NuxtLink to="/razdelka" class="text-lg font-bold">BAHRA CHICKEN MEAT</NuxtLink>
        </div>
        <Time />
        <nav class="py-4">
          <ul class="space-y-2">
            <li>
              <NuxtLink
                href="/razdelka/getProduct"
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
              >
                Muzlatgichdan Olish
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                href="/razdelka/putProduct"
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
              >
                Muzlatgichga Joylash
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/razdelka/fridge"
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
              >
                Muzlatgich
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                href="/chat"
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
              >
                Chat
              </NuxtLink>
            </li>
            
          <li>
              <NuxtLink
                href="/logout"
                class="block px-4 py-20 text-xl text-red-500"
              >
              
                Chiqish
              </NuxtLink>
            </li>
          </ul>
        </nav>
       
      </div>
      <div class="flex-1 p-8">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style>
.py-20 {
  padding-top: 24rem;
  padding-bottom: 0;
}
</style>
