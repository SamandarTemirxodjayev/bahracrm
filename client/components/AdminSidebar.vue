<template>
  <div>
    <div class="flex h-screen bg-gray-100">
      <div class="w-64 bg-white border-r">
        <div class="p-4">
          <NuxtLink to="/admin" class="text-lg font-bold">BAHRA CHICKEN MEAT</NuxtLink>
        </div>
        <Time />
        <nav class="py-4">
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/admin/users"
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
              >
                Xodimlar
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/fridge"
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
              >
                Muzlatgichlar
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/product"
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
              >
                Tovarlar
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/history"
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
              >
                Amaliyotlar
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/razdelkaHistory"
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
              >
                Razdelka Ma'lumot
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
            <li>
              <NuxtLink
                href="/chat"
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
              >
                Chat
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
