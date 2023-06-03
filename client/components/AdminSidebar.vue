<template>
  <div>
    <div class="flex h-screen bg-gray-100">
      <div class="w-64 bg-white border-r">
        <div class="p-4">
          <NuxtLink to="/admin" class="text-lg font-bold">BAHRA CHICKEN MEAT</NuxtLink>
        </div>
        <nav class="py-4">
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/admin/register"
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
              >
                Xodim Qo'shish
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/"
                class="block px-4 py-2 text-xl text-gray-700 hover:bg-gray-200"
              >
                About
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
