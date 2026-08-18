<script setup lang="ts">
import { ref } from 'vue'
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function login() {
  if (password.value !== confirmPassword.value) {
    console.log('Passwords do not match!')
    return
  } else {
    console.log({
      email: email.value,
      password: password.value,
    })
  }
}
</script>

<template>
  <form @submit.prevent="login" class="space-y-4">
    <input
      v-model="email"
      type="email"
      placeholder="Email"
      required
      class="w-full rounded border p-2"
    />

    <input
      v-model="password"
      type="password"
      placeholder="Password"
      required
      class="w-full rounded border p-2"
    />

    <input
      v-model="confirmPassword"
      type="password"
      placeholder="Confirm Password"
      required
      class="w-full rounded border p-2"
    />

    <button class="w-full rounded bg-blue-600 py-2 text-white">Login</button>
  </form>
</template>
