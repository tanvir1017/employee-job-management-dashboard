<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  loading?: boolean
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  loading: false,
  disabled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  if (props.loading || props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>
<template>
  <button
    :type="props.type"
    :disabled="props.disabled || props.loading"
    @click="handleClick"
    class="rounded px-4 py-2 text-white transition"
    :class="{
      'bg-blue-600 hover:bg-blue-700': props.variant === 'primary',

      'bg-gray-600 hover:bg-gray-700': props.variant === 'secondary',

      'bg-red-600 hover:bg-red-700': props.variant === 'danger',

      'opacity-50 cursor-not-allowed': props.loading || props.disabled,
    }"
  >
    <span v-if="props.loading"> loading... </span>

    <span v-else>
      <slot />
    </span>
  </button>
</template>
