<script setup lang="ts">
import { ref } from 'vue'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import { registerSchema } from '../schemas/auth.schema'

import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const { registerUser } = useAuth()

const router = useRouter()

const loading = ref(false)

const submitError = ref('')

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(registerSchema),
})

const [name] = defineField('name')

const [email] = defineField('email')

const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true

    submitError.value = ''

    const user = await registerUser(values)

    console.log('Registered:', user)
    router.push('/auth/login')
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Something went wrong'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label> Name </label>

      <input v-model="name" class="border p-2 w-full" />

      <p class="text-red-500">
        {{ errors.name }}
      </p>
    </div>

    <div>
      <label> Email </label>

      <input v-model="email" type="email" class="border p-2 w-full" />

      <p class="text-red-500">
        {{ errors.email }}
      </p>
    </div>

    <div>
      <label> Password </label>

      <input v-model="password" type="password" class="border p-2 w-full" />

      <p class="text-red-500">
        {{ errors.password }}
      </p>
    </div>

    <p v-if="submitError" class="text-red-600">
      {{ submitError }}
    </p>

    <button :disabled="loading" type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
      {{ loading ? 'Creating...' : 'Register' }}
    </button>
  </form>

  <div>
      <p class="mt-4 text-center">
        Already have an account? <router-link to="/auth/login" class="text-blue-600 hover:underline">Login</router-link>
      </p>
    </div>


</template>
