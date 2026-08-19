<script setup lang="ts">
import { useAuth } from '@/modules/auth/composables/useAuth'
import { loginSchema } from '@/modules/auth/schemas/auth.schema'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const loading = ref(false)

const submitError = ref('')

const { loginUser } = useAuth()

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const [email] = defineField('email')
const [password] = defineField('password')

const router = useRouter()

const handleLogin = handleSubmit(async (values) => {
  try {
    const login = await loginUser({
      email: values.email,
      password: values.password,
    })

    console.log('Logged in:', login)

    router.push('/dashboard')
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Something went wrong'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
    <div>
      <label> Email </label>
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="w-full rounded border p-2"
      />
      <p class="text-red-500">
        {{ errors.email }}
      </p>
    </div>

    <div>
      <label> Password </label>
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="w-full rounded border p-2"
      />

      <p class="text-red-500">
        {{ errors.password }}
      </p>
    </div>

    <p v-if="submitError" class="text-red-600">
      {{ submitError }}
    </p>

    <button
      :disabled="loading"
      type="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
    >
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>
  </form>

  <div>
    <p class="mt-4 text-center">
      Don't have an account?
      <router-link to="/auth/register" class="text-blue-600 hover:underline">Register</router-link>
    </p>
  </div>
</template>
