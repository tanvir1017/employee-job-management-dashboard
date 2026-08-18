<script setup lang="ts">
import { ref } from 'vue'
const sidebarOpen = ref(true)
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <aside v-if="sidebarOpen" class="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white p-5">
      <h2 class="text-xl font-bold mb-6">Dashboard Layout</h2>

      <nav class="space-y-3">
        <a href="#"> Dashboard </a>

        <a href="#"> Employees </a>

        <a href="#"> Jobs </a>
      </nav>
    </aside>

    <main :class="sidebarOpen ? 'ml-64' : ''" class="p-6">
      <button @click="sidebarOpen = !sidebarOpen">Toggle Sidebar</button>

      <RouterView />
    </main>
  </div>
</template>
