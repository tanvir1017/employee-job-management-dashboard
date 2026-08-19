<script setup lang="ts">
import AppCard from '@/components/shared/AppCard.vue'
import { onMounted, onUnmounted } from 'vue'

const dashStatistics = [
  { title: 'Total Employees', value: 120 },
  { title: 'Active Projects', value: 15 },
  { title: 'Pending Tasks', value: 42 },
]

onMounted(() => {
  console.log(`Dashboard component is now mounted.`)
})

onUnmounted(() => {
  console.log(`Dashboard component is now unmounted.`)
})
</script>

<template>
  <div>
    <h2 class="mb-4 text-4xl font-bold">Welcome John!</h2>

    <div class="grid grid-cols-3 gap-4">
      <AppCard
        v-for="stats in dashStatistics"
        :key="stats.title"
        class="card rounded bg-gray-200 p-4"
      >
        <template #header>
          <h3 class="text-lg">{{ stats.title }}</h3>
        </template>

        <p class="text-6xl text-gray-900 italic font-bold">{{ stats.value }}</p>
      </AppCard>
    </div>
  </div>
</template>
