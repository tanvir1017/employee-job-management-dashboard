<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const params = router.currentRoute.value.params
const query = router.currentRoute.value.query
</script>

<template>
  <div>
    This is employee details of
    <strong>Param is {{ params.id }} | Query is: {{ query.utm_source }}</strong>
  </div>
  <div class="bg-red-200 text-red-800 p-3 rounded-lg mt-3">
    <p>Params: {{ params }}</p>
    <p>Query: {{ query }}</p>
  </div>
</template>
