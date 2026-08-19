<script setup lang="ts">
import AppButton from '@/components/shared/AppButton.vue'
import AppInput from '@/components/shared/AppInput.vue'
import { ref } from 'vue'
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

function login() {
  loading.value = true
  if (password.value !== confirmPassword.value) {
    console.log('Passwords do not match!')
    loading.value = false
    return
  } else {
    console.log({
      email: email.value,
      password: password.value,
    })
    loading.value = false
  }
}
</script>

<template>
  <div
    :class="{
      'form-value  p-4 mb-4 rounded bg-gray-300':
        email.length > 0 || password.length > 0 || confirmPassword.length > 0,
    }"
  >
    <p v-if="email.length > 0"><strong>Email:</strong> {{ email }} <br /></p>

    <p v-if="password.length > 0"><strong>Password:</strong> {{ password }} <br /></p>

    <p v-if="confirmPassword.length > 0">
      <strong>Confirm Password:</strong> {{ confirmPassword }} <br />
    </p>
  </div>

  <form @submit.prevent="login" class="space-y-4">
    <AppInput label="Email" v-model="email" type="email" placeholder="Email" required />

    <AppInput v-model="password" label="Password" type="password" placeholder="Password" required />

    <AppInput
      label="Confirm Password"
      v-model="confirmPassword"
      type="password"
      placeholder="Confirm Password"
      required
    />

    <AppButton type="submit" variant="danger" :loading="loading"> Login </AppButton>
  </form>
</template>
