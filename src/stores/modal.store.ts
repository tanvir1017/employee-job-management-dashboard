import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
    const isOpen = ref(false)

    const title = ref('')

    const message = ref('')

    const confirmAction = ref<(() => void) | null>(null)

    function openModal(options: { title: string; message: string; onConfirm: () => void }) {
        title.value = options.title

        message.value = options.message

        confirmAction.value = options.onConfirm

        isOpen.value = true
    }

    function closeModal() {
        isOpen.value = false

        confirmAction.value = null
    }

    function confirm() {
        confirmAction.value?.()

        closeModal()
    }

    return {
        isOpen,
        title,
        message,

        openModal,
        closeModal,
        confirm,
    }
})
