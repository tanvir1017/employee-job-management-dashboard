<script setup lang="ts"></script>

<template>
  <div class="rounded-lg bg-white p-5 shadow">
    <div v-if="$slots.header">
      <slot name="header" />
    </div>

    <div>
      <slot />
    </div>

    <div v-if="$slots.footer" class="mt-4 border-t pt-3">
      <slot name="footer" />
    </div>
  </div>
</template>
