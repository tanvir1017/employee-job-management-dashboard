<script setup lang="ts">
import { PanelLeft } from '@lucide/vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const sidebarOpen = ref(true)

const sidebarNav = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    isActive: true,
    isNew: false,
  },
  {
    title: 'Employees',
    href: '/employees',
    icon: 'users',
    isActive: false,
    isNew: false,
  },
]
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <aside v-if="sidebarOpen" class="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white p-5">
      <h2 class="text-xl font-bold mb-6">Dashboard</h2>

      <nav class="space-y-3">
        <RouterLink
          v-for="nav in sidebarNav"
          :key="nav.href"
          :to="nav.href"
          class="block py-0.5 px-4 rounded hover:bg-gray-700"
        >
          {{ nav.title }}
        </RouterLink>
      </nav>
    </aside>

    <main :class="sidebarOpen ? 'ml-64' : ''" class="p-6">
      <button
        @click="sidebarOpen = !sidebarOpen"
        class="flex items-center gap-0.5 mb-4 rounded bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300 cursor-pointer"
      >
        <PanelLeft /> Sidebar
      </button>

      <RouterView />
    </main>
  </div>
</template>
