import type { User } from '@/modules/auth/types'
import type { Employee } from '@/modules/employees/type'


export interface MockUser extends User {
    password: string
}

export const users: MockUser[] = [
    {
        id: '1',
        name: 'Tanvir Hossain',
        email: 'tanvir@example.com',
        password: 'password123',
        employeeId: '1'
    },
    {
        id: '2',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        employeeId: '2'
    }
]


export const employees: Employee[] = [

    {
        id: '1',
        name: 'Tanvir Hossain',
        email: 'tanvir@test.com',
        role: 'Developer',
        department: 'Engineering'
    },

    {
        id: '2',
        name: 'John Smith',
        email: 'john@test.com',
        role: 'Manager',
        department: 'HR'
    }

]