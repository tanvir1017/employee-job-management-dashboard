<script setup lang="ts">
import { useModalStore } from '@/stores/modal.store'
import AppButton from './AppButton.vue'

const modalStore = useModalStore()
</script>

<template>
  <div
    v-if="modalStore.isOpen"
    class="fixed inset-0 flex items-center justify-center backdrop-blur drop-shadow-xl bg-black/70"
    @click="modalStore.closeModal"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md" @click.stop>
      <h2 class="text-xl font-bold">
        {{ modalStore.title }}
      </h2>

      <p class="mt-3 text-gray-600">
        {{ modalStore.message }}
      </p>

      <div class="mt-6 flex justify-end gap-3">
        <AppButton @click="modalStore.closeModal" class="" variant="danger">Cancel</AppButton>

        <AppButton @click="modalStore.confirm" variant="primary"> Confirm </AppButton>
      </div>
    </div>
  </div>
</template>
