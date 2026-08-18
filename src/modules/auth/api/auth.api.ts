import { users } from "@/mocks/database";
import { delay } from "@/mocks/delay";
import type { LoginPayload, RegisterPayload, User } from "../types";

export const register = async (payload: RegisterPayload) => {

    // making some fake delay to simulate a real API call
    await delay()

    // check if the user already exists
    const isExist = users.find(user => user.email === payload.email)

    if (isExist) {
        throw new Error('User already exists')
    }

    const newUser: User = {
        id: crypto.randomUUID(),
        name: payload.name,
        email: payload.email
    }
    users.push(newUser)
    return newUser
}

export const login = async (payload: LoginPayload) => {
    // making some fake delay to simulate a real API call
    await delay()

    // check is user is exist or not
    const isUserExist = users.find(user => user.email === payload.email)


    if (!isUserExist) {
        throw new Error('User does not exist')
    }

    // check if password is correct
    if (payload.password !== 'password') {
        throw new Error('Invalid credentials')
    }

    return isUserExist;
}