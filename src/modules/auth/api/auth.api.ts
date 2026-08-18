import { type MockUser, users } from "@/mocks/database";
import { delay } from "@/mocks/delay";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../types";

export const register = async (payload: RegisterPayload) => {

    // making some fake delay to simulate a real API call
    await delay()

    // check if the user already exists
    const isExist = users.find(user => user.email === payload.email)

    if (isExist) {
        throw new Error('User already exists')
    }

    const newUser: MockUser = {
        id: crypto.randomUUID(),
        name: payload.name,
        email: payload.email,
        password: payload.password
    }
    users.push(newUser)
    return newUser
}



export async function login(
    payload: LoginPayload
): Promise<AuthResponse> {

    await delay()


    const user: MockUser | undefined = users.find(
        user => user.email === payload.email
    )


    if (!user) {
        throw new Error(
            'Invalid email or password'
        )
    }


    if (user.password !== payload.password) {
        throw new Error(
            'Invalid email or password'
        )
    }


    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },

        token: crypto.randomUUID()
    }

}