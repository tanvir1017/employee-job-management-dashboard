<script setup lang="ts">
interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  type?: string
  error?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement

  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="space-y-1">
    <label>
      {{ props.label }}
    </label>

    <input
      :value="props.modelValue"
      @input="updateValue"
      :placeholder="props.placeholder"
      :type="props.type"
      :required="required"
      class="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
    />

    <p v-if="props.error">{{ props.error }}</p>
  </div>
</template>
