import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../types'

export const useAuthStore = defineStore("auth.store", () => {

    const user = ref<User | null>(null)

    function setUser(value: User) {
        user.value = value
    }

    function logout() {
        user.value = null
    }

    return {
        user,
        setUser,
        logout
    }

})