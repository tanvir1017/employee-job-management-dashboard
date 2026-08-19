import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { User } from '../types'

export const useAuthStore = defineStore("auth.store", () => {

    const user = ref<User | null>(null)
    const token = ref<string | null>(
        localStorage.getItem('authToken')
    )

    const isAuthenticated = computed(() => !!token.value)

    function setUser(
        value: User
    ) {
        user.value = value
    }


    function setAuth(authUser: User, authToken: string) {
        user.value = authUser
        token.value = authToken

        localStorage.setItem('authToken', authToken)

    }

    function logout() {
        user.value = null
        token.value = null
        localStorage.removeItem('authToken')
    }

    return {
        user,
        setUser,
        token,
        isAuthenticated,
        setAuth,
        logout
    }

})