import type { User } from '@/modules/auth/types'


export interface MockUser extends User {
    password: string
}

export const users: MockUser[] = [
    {
        id: '1',
        name: 'Tanvir Hossain',
        email: 'tanvir@example.com',
        password: 'password123'
    }
]