import { login, register } from "../api/auth.api"
import { useAuthStore } from "../stores/auth.store"
import type { LoginPayload, RegisterPayload } from "../types"

export const useAuth = () => {
    const authStore = useAuthStore()

    const registerUser = async (payload: RegisterPayload) => {

        // call the register API
        const user = await register(payload)

        // set the user in the store
        authStore.setUser(user)

        return user;
    }

    // login function
    const loginUser = async (payload: LoginPayload) => {
        const response = await login(payload)
        authStore.setAuth(response.user, response.token)
        return response;
    }

    return {
        registerUser,
        loginUser
    }

}