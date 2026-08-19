<script setup lang="ts">
import AppButton from '@/components/shared/AppButton.vue'
import AppCard from '@/components/shared/AppCard.vue'
import { useEmployees } from '@/modules/employees/composables/useEmployees'
import { Pencil, Trash } from '@lucide/vue'

const {
  fetchEmployees: { isLoading, isFetching, data: employees, error },
  deleteEmployeeMutation,
} = useEmployees()

const handleDeleteEmployee = (employeeId: string) => {
  deleteEmployeeMutation.mutate({
    id: employeeId,
  })
}
</script>

<template>
  <div v-if="isLoading || isFetching" class="grid grid-cols-2 gap-1">
    <AppCard v-for="n in 2" :key="n" class="border border-gray-400/70 overflow-hidden">
      <div class="shimmer-line h-6 w-2/5 mb-3 rounded"></div>
      <div class="shimmer-line h-4 w-4/5 mb-2 rounded"></div>
      <div class="shimmer-line h-4 w-3/5 mb-2 rounded"></div>
      <div class="shimmer-line h-4 w-2/3 mb-4 rounded"></div>
      <div class="shimmer-button rounded-md"></div>
    </AppCard>
  </div>

  <div v-else-if="error">
    <p>Error: {{ error }}</p>
  </div>

  <div v-else>
    <h1 class="text-4xl font-semibold mb-3">Employees</h1>
    <div class="grid grid-cols-2 gap-1">
      <AppCard v-for="employee in employees" :key="employee.id" class="border border-gray-400/70">
        <h2>{{ employee.name }}</h2>
        <p>Email: {{ employee.email }}</p>
        <p>Position: {{ employee.department }}</p>
        <p>Position: {{ employee.role }}</p>
        <div class="mt-5 flex items-center justify-end gap-1.5">
          <AppButton
            @click="handleDeleteEmployee(employee.id)"
            variant="danger"
            :disabled="isFetching || isLoading"
            class="cursor-pointer mt-2 flex items-center space-x-2"
          >
            <Trash class="size-4 inline-block" />
            Delete</AppButton
          >

          <AppButton
            @click="handleDeleteEmployee(employee.id)"
            variant="primary"
            :disabled="isFetching || isLoading"
            class="cursor-pointer mt-2 flex items-center space-x-2"
          >
            <Pencil class="size-4 inline-block" /> Edit</AppButton
          >
        </div>
      </AppCard>
    </div>
  </div>
</template>
