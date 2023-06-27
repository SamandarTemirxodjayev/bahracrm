<template>
  <div>
    <div class="flex min-h-screen bg-gray-100 h-full">
      <div class="w-64 bg-white border-r">
        <div class="p-4">
          <NuxtLink to="/sklad" class="text-lg font-bold">BAHRA CHICKEN MEAT</NuxtLink>
        </div>
        <Time />
        <nav class="py-4">
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/sklad/add"
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
              >
                Qabul Qilish
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/sklad/delete"
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
              >
                Rasxod
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/sklad/fridge"
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
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
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
